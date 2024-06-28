import { useMemo } from "react";

export const useFormattedTime = (time: number) => {
  const minutes = useMemo(() => {
    let truncatedMinutes = Math.floor(time / 60);
    const formattedMinutes = truncatedMinutes.toString();
    return formattedMinutes;
  }, [time]);

  const seconds = useMemo(() => {
    let truncatedSeconds = Math.round(time) % 60;
    const formattedExtraSeconds =
      truncatedSeconds < 10
        ? "0" + truncatedSeconds
        : truncatedSeconds.toString();
    return formattedExtraSeconds;
  }, [time]);

  return { minutes, seconds };
};
