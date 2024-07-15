import { useMemo } from "react";
import type { TimeFormat } from "../types";

export const useFormattedTime = (
  time: number,
  format: TimeFormat = "hh:mm:ss:ms"
) => {
  const formattedTime = useMemo(() => {
    const dateObj = new Date(time * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getUTCSeconds();
    const ms = dateObj.getUTCMilliseconds();

    switch (format) {
      case "mm:ss":
        return (
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0")
        );
      case "hh:mm:ss":
        return (
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0")
        );
      case "mm:ss:ms":
        return (
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0") +
          ":" +
          ms.toString().padStart(2, "0")
        );
      default:
        return (
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0") +
          ":" +
          ms.toString().padStart(2, "0")
        );
    }
  }, [time]);

  return { formattedTime };
};
