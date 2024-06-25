import { useState, useMemo } from "react";

export const useElapsedTime = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const minutes = useMemo(() => {
    let truncatedMinutes = Math.floor(elapsedSeconds / 60);
    const formattedMinutes = truncatedMinutes.toString();
    return formattedMinutes;
  }, [elapsedSeconds]);

  const seconds = useMemo(() => {
    let truncatedSeconds = Math.round(elapsedSeconds) % 60;
    const formattedExtraSeconds =
      truncatedSeconds < 10
        ? "0" + truncatedSeconds
        : truncatedSeconds.toString();
    return formattedExtraSeconds;
  }, [elapsedSeconds]);

  return { minutes, seconds, setElapsedSeconds };
};
