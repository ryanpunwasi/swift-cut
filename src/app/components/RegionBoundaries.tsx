"use client";
import { useFormattedTime } from "../hooks/useFormattedTime.hook";

type Props = {
  start: number | null;
  end: number | null;
};

import { Tooltip } from "react-tooltip";

const RegionBoundaries = ({ start, end }: Props) => {
  if (start === null || end === null) {
    return null;
  }

  const { minutes: startMinutes, seconds: startSeconds } =
    useFormattedTime(start);
  const { minutes: endMinutes, seconds: endSeconds } = useFormattedTime(end);

  return (
    <div className="flex items-center justify-center gap-3 text-sm">
      <span
        data-tooltip-id="region-start-identifier"
        data-tooltip-content="Region start time"
        className="h-9 bg-zinc-900 px-4 py-1.5 rounded-xl border border-gray-700 w-20 flex justify-center items-center text-blue-200"
      >
        {startMinutes}:{startSeconds}
      </span>
      <span className="font-thin text-gray-500">—</span>
      <span
        data-tooltip-id="region-end-identifier"
        data-tooltip-content="Region end time"
        className="h-9 bg-zinc-900 px-4 py-1.5 rounded-xl border border-gray-700 w-20 flex justify-center items-center text-blue-200"
      >
        {endMinutes}:{endSeconds}
      </span>
      <Tooltip
        id="region-start-identifier"
        place="bottom"
        opacity={0.6}
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "15px",
        }}
      />
      <Tooltip
        id="region-end-identifier"
        place="bottom"
        opacity={0.6}
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "15px",
        }}
      />
    </div>
  );
};
export default RegionBoundaries;
