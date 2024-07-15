import WaveSurfer from "wavesurfer.js";
import { useState, useMemo, use } from "react";
import { useFormattedTime } from "./useFormattedTime.hook";
import type { TimeFormat } from "../types";

export const useDuration = (waveSurfer: WaveSurfer | null) => {
  const [duration, setDuration] = useState<number>(
    waveSurfer?.getDuration() || 0
  );
  const dateObj = new Date(duration * 1000);
  const hours = dateObj.getUTCHours();
  let format: TimeFormat = "hh:mm:ss";
  if (hours === 0) format = "mm:ss";

  const { formattedTime } = useFormattedTime(Math.ceil(duration), format);
  const formattedDuration = useMemo(() => {
    return formattedTime;
  }, [waveSurfer, duration]);

  return { formattedDuration, setDuration };
};
