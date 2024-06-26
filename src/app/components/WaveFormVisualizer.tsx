"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useKeyDown } from "../hooks/useKeyDown.hook";
import { useElapsedTime } from "../hooks/useElapsedTime.hook";
import { useDuration } from "../hooks/useDuration.hook";
import PlaybackPanel from "./PlaybackPanel";

import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";

type ContainerProps = {
  src: string;
};

type WaveFormProps = {
  src: string;
};

const WaveFormVisualizerContainer = ({ src }: ContainerProps) => {
  return (
    <>
      <WaveFormVisualizer src={src} />
    </>
  );
};

const WaveFormVisualizer = ({ src }: WaveFormProps) => {
  const waveFormRef = useRef<HTMLDivElement | null>(null);
  let waveSurfer = useRef<WaveSurfer | null>(null);
  let regionRef = useRef<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [regionBoundaries, setRegionBoundaries] = useState<
    [number, number] | []
  >([]);

  const { minutes, seconds, setElapsedSeconds } = useElapsedTime();
  const { formattedDuration, setDuration } = useDuration(waveSurfer.current);

  useKeyDown(" ", () => {
    waveSurfer.current?.playPause();
  });

  useKeyDown("k", () => {
    waveSurfer.current?.playPause();
  });

  useKeyDown("ArrowRight", () => {
    waveSurfer.current?.skip(5);
  });

  useKeyDown("ArrowLeft", () => {
    waveSurfer.current?.skip(-5);
  });

  useKeyDown("0", () => {
    waveSurfer.current?.setTime(0);
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
      const start = duration * 0.25;
      const end = duration * 0.75;

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

    regions.on("region-double-clicked", (e: any) => {
      e.play();
    });

    regions.on("region-out", (e: any) => {
      e.play();
    });

    waveSurfer.current.on("ready", function () {
      if (waveSurfer.current) {
        const totalTime = waveSurfer.current.getDuration();
        setDuration(totalTime);
      }
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

  const skipForward = () => {
    waveSurfer.current?.skip(5);
  };

  const skipBackward = () => {
    waveSurfer.current?.skip(-5);
  };

  return (
    <div>
      <div ref={waveFormRef} className="hover:cursor-pointer"></div>
      <div className="flex justify-center absolute bottom-10 left-1/2 right-1/2">
        <PlaybackPanel
          duration={formattedDuration}
          currentTime={`${minutes}:${seconds}`}
          playPause={playPause}
          controls={{ playPause, skipForward, skipBackward }}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
};

export default WaveFormVisualizerContainer;
