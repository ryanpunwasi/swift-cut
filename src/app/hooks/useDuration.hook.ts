import WaveSurfer from "wavesurfer.js";
import { useState, useMemo } from "react";

export const useDuration = (waveSurfer: WaveSurfer | null) => {
  const [duration, setDuration] = useState<number>(
    waveSurfer?.getDuration() || 0
  );

  const minutes = useMemo(() => {
    let truncatedMinutes = Math.floor(duration / 60);
    const formattedMinutes = truncatedMinutes.toString();
    return formattedMinutes;
  }, [duration]);

  const seconds = useMemo(() => {
    let truncatedSeconds = Math.round(duration) % 60;
    const formattedExtraSeconds =
      truncatedSeconds < 10
        ? "0" + truncatedSeconds
        : truncatedSeconds.toString();
    return formattedExtraSeconds;
  }, [duration]);

  const formattedDuration = useMemo(() => {
    return `${minutes}:${seconds}`;
  }, [waveSurfer, duration]);

  return { formattedDuration, setDuration };
};
