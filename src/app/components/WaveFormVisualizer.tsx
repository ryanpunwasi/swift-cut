"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useKeyDown } from "../hooks/useKeyDown.hook";

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
  let waveSurfer: WaveSurfer | null;

  const [muted, setMuted] = useState(false);

  useKeyDown(" ", () => {
    waveSurfer?.playPause();
  });

  useKeyDown("k", () => {
    waveSurfer?.playPause();
  });

  useKeyDown("ArrowRight", () => {
    waveSurfer?.skip(5);
  });

  useKeyDown("ArrowLeft", () => {
    waveSurfer?.skip(-5);
  });

  useKeyDown("j", () => {
    waveSurfer?.seekTo(0);
  });

  useKeyDown("l", () => {
    waveSurfer?.seekTo(1);
  });

  useEffect(() => {
    const audioElement = new Audio(src);
    audioElement.preload = "auto";

    waveSurfer = WaveSurfer.create({
      container: waveFormRef.current as HTMLDivElement,
      waveColor: "#404040",
      progressColor: "#f472b6",
      dragToSeek: true,
      width: "80vw",
      hideScrollbar: true,
      normalize: true,
      backend: "MediaElement",
      media: audioElement,
    });

    waveSurfer.on("interaction", () => {
      waveSurfer?.play();
    });

    waveSurfer.on("timeupdate", () => {
      const currentTime = Math.round(waveSurfer?.getCurrentTime() || 0);
      let minutes = Math.floor(currentTime! / 60);
      let extraSeconds = Math.round(currentTime!) % 60;
      const formattedMinutes =
        minutes < 10 ? "0" + minutes : minutes.toString();
      const formattedExtraSeconds =
        extraSeconds < 10 ? "0" + extraSeconds : extraSeconds.toString();

      console.log(`${formattedMinutes}:${formattedExtraSeconds}`);
    });

    return () => {
      waveSurfer?.destroy();
    };
  }, [src]);

  return (
    <div>
      <div ref={waveFormRef}>{muted && <>Muted</>}</div>
    </div>
  );
};

export default WaveFormVisualizerContainer;
