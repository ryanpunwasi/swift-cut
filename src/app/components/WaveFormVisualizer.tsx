"use client";

import { useEffect, useRef, useState } from "react";
import type { SetStateAction, Dispatch } from "react";
import WaveSurfer from "wavesurfer.js";
import { useKeyDown } from "../hooks/useKeyDown.hook";
import { useElapsedTime } from "../hooks/useElapsedTime.hook";
import { useDuration } from "../hooks/useDuration.hook";
import PlaybackPanel from "./PlaybackPanel";
import SurferContext from "./SurferContext";

import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import RegionBoundaries from "./RegionBoundaries";
import { truncate } from "../lib/truncate";
import LoadingIcon from "./LoadingIcon";

type ContainerProps = {
  src: string;
  s3Key: string;
};

type WaveFormProps = {
  src: string;
  s3Key: string;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

const WaveFormVisualizerContainer = ({ src, s3Key }: ContainerProps) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <WaveFormVisualizer
        src={src}
        s3Key={s3Key}
        setDisabled={setDisabled}
        disabled={disabled}
      />
    </>
  );
};

const WaveFormVisualizer = ({
  src,
  s3Key,
  setDisabled,
  disabled,
}: WaveFormProps) => {
  const waveFormRef = useRef<HTMLDivElement | null>(null);
  let waveSurfer = useRef<WaveSurfer | null>(null);
  let regionRef = useRef<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [regionBoundaries, setRegionBoundaries] = useState<
    [number, number] | []
  >([]);

  const { formattedTime, setElapsedSeconds } = useElapsedTime();
  const { formattedDuration, setDuration } = useDuration(waveSurfer.current);

  useKeyDown(" ", () => {
    if (!disabled) waveSurfer.current?.playPause();
  });

  useKeyDown("k", () => {
    if (!disabled) waveSurfer.current?.playPause();
  });

  useKeyDown("m", () => {
    if (!disabled) toggleMute();
  });

  useKeyDown("ArrowRight", () => {
    if (!disabled) waveSurfer.current?.skip(5);
  });

  useKeyDown("ArrowLeft", () => {
    if (!disabled) waveSurfer.current?.skip(-5);
  });

  useKeyDown("0", () => {
    if (!disabled) waveSurfer.current?.setTime(0);
  });

  useEffect(() => {
    const audioElement = new Audio(src);
    audioElement.preload = "auto";

    waveSurfer.current = WaveSurfer.create({
      container: waveFormRef.current as HTMLDivElement,
      waveColor: "#404040",
      progressColor: "#f472b6",
      dragToSeek: true,
      width: "80vw",
      hideScrollbar: true,
      normalize: true,
      backend: "MediaElement",
      media: audioElement,
      autoplay: false,
      barGap: 2,
      barWidth: 2,
      barRadius: 10,
      cursorColor: "white",
      minPxPerSec: 1,
      plugins: [
        Hover.create({
          lineColor: "white",
          lineWidth: 1,
          labelBackground: "#2C2C2C",
          labelColor: "#fff",
          labelSize: "14px",
        }),
      ],
    });

    const regions = waveSurfer.current.registerPlugin(RegionsPlugin.create());

    waveSurfer.current.on("decode", () => {
      const duration = waveSurfer.current?.getDuration() as number;
      const start = 0;
      const end = duration;

      regionRef.current = regions.addRegion({
        start,
        end,
        color: "rgba(154, 154, 154, 0.54)",
        drag: true,
        resize: true,
        maxLength: waveSurfer.current?.getDuration(),
      });

      regionRef.current.on("update-end", () => {
        setRegionBoundaries([regionRef.current.start, regionRef.current.end]);
      });
    });

    regions.on("region-created", (e: any) => {
      setRegionBoundaries([e.start, e.end]);
    });

    regions.on("region-out", (e: any) => {
      e.play();
    });

    regions.on("region-double-clicked", (e: any) => {
      e.play();
    });

    waveSurfer.current.on("ready", function () {
      if (waveSurfer.current) {
        const totalTime = waveSurfer.current.getDuration();
        setDuration(totalTime);
      }
    });

    waveSurfer.current.on("redraw", function () {
      setLoading(false);
    });

    waveSurfer.current.on("play", () => {
      setIsPlaying(true);
    });

    waveSurfer.current.on("pause", () => {
      setIsPlaying(false);
    });

    waveSurfer.current.on("timeupdate", () => {
      const currentTime = Math.round(waveSurfer.current?.getCurrentTime() || 0);
      setElapsedSeconds(currentTime);
    });

    return () => {
      waveSurfer.current?.destroy();
    };
  }, []);

  const playPause = () => {
    waveSurfer.current?.playPause();
  };

  const toggleMute = () => {
    const isMuted = waveSurfer.current?.getMuted();
    if (isMuted !== undefined) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      waveSurfer.current?.setMuted(newMuteState);
    }
  };

  const skipForward = () => {
    waveSurfer.current?.skip(5);
  };

  const skipBackward = () => {
    waveSurfer.current?.skip(-5);
  };

  return (
    <div>
      <div
        ref={waveFormRef}
        className={`hover:cursor-pointer  ${
          loading ? "h-0" : "border-r border-l border-gray-300"
        }`}
      ></div>
      {loading && <LoadingIcon text="Drawing waveform..."></LoadingIcon>}
      {!loading && (
        <div className="flex justify-center mt-5">
          <SurferContext waveSurfer={waveSurfer.current}>
            <RegionBoundaries
              setDisabled={setDisabled}
              start={
                regionBoundaries[0] !== undefined
                  ? truncate(regionBoundaries[0])
                  : null
              }
              end={
                regionBoundaries[1] !== undefined
                  ? truncate(regionBoundaries[1])
                  : null
              }
              rawRegionBoundaries={regionBoundaries}
              s3Key={s3Key}
            />
          </SurferContext>
        </div>
      )}

      <div className="flex justify-center absolute bottom-10 left-1/2 right-1/2">
        <PlaybackPanel
          disabled={disabled}
          waveSurfer={waveSurfer.current}
          duration={formattedDuration}
          currentTime={formattedTime}
          playPause={playPause}
          controls={{ playPause, skipForward, skipBackward, toggleMute }}
          isPlaying={isPlaying}
          isMuted={isMuted}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
};

export default WaveFormVisualizerContainer;
