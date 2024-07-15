import { useState } from "react";
import { useFormattedTime } from "./useFormattedTime.hook";
import { TimeFormat } from "../types";

export const useElapsedTime = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const dateObj = new Date(elapsedSeconds * 1000);
  const hours = dateObj.getUTCHours();
  let format: TimeFormat = "hh:mm:ss";
  if (hours === 0) format = "mm:ss";
  const { formattedTime } = useFormattedTime(elapsedSeconds, format);

  return { formattedTime, setElapsedSeconds };
};
