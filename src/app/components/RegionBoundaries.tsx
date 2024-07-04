"use client";
import { useState } from "react";
import { useFormattedTime } from "../hooks/useFormattedTime.hook";
import { BeatLoader } from "react-spinners";
import { sendMessage } from "../actions/sendMessage";

type Props = {
  start: number | null;
  end: number | null;
  rawRegionBoundaries: [number, number] | [];
  s3Key: string;
};

import { Tooltip } from "react-tooltip";

const RegionBoundaries = ({
  start,
  end,
  rawRegionBoundaries,
  s3Key,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { minutes: startMinutes, seconds: startSeconds } = useFormattedTime(
    start || 0
  );
  const { minutes: endMinutes, seconds: endSeconds } = useFormattedTime(
    end || 0
  );

  const handleSubmit = () => {
    setLoading(true);

    // Submit to SQS
  };

  if (start === null || end === null) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
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
          place="left"
          opacity={0.6}
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "15px",
          }}
        />
        <Tooltip
          id="region-end-identifier"
          place="right"
          opacity={0.6}
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "15px",
          }}
        />
      </div>
      <form action={sendMessage} onSubmit={handleSubmit}>
        <input type="hidden" value={s3Key} name="s3Key" />
        <input type="hidden" value={rawRegionBoundaries[0]} name="start" />
        <input type="hidden" value={rawRegionBoundaries[1]} name="end" />
        <button
          type="submit"
          disabled={loading}
          className={`h-10 flex justify-center items-center w-36 tracking-wide disabled:brightness-75 disabled:cursor-not-allowed filter hover:brightness-110 active:brightness-125 saturate-150 text-sm bg-fuchsia-900 font-semibold text-fuchsia-100 rounded-lg px-5 py-2 

        }`}
        >
          {loading ? (
            <BeatLoader loading={loading} size={5} color="white" />
          ) : (
            "Trim audio"
          )}
        </button>
      </form>
    </div>
  );
};
export default RegionBoundaries;
