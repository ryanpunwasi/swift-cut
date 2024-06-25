"use client";

import { use, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useKeyDown } from "../hooks/useKeyDown.hook";
import { useElapsedTime } from "../hooks/useElapsedTime.hook";
import { useDuration } from "../hooks/useDuration.hook";
import PlaybackPanel from "./PlaybackPanel";

type Props = {
  src: string;
};

const WaveFormVisualizerContainer = ({ src }: Props) => {
  return (
    <>
      <WaveFormVisualizer src={src} />
    </>
  );
};

const WaveFormVisualizer = ({ src }: Props) => {
  const waveFormRef = useRef<HTMLDivElement | null>(null);
  let waveSurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { minutes, seconds, setElapsedSeconds } = useElapsedTime();
  const { formattedDuration, setDuration } = useDuration(waveSurfer.current);

  useKeyDown(" ", () => {
    waveSurfer.current?.playPause();
  });

  useKeyDown("j", () => {
    waveSurfer.current?.skip(-10);
  });
  useKeyDown("l", () => {
    waveSurfer.current?.skip(10);
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
    });

    waveSurfer.current.on("dblclick", () => {
      playPause();
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
