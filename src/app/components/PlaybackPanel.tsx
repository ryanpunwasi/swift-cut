"use client";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { PiSkipForwardFill, PiSkipBackFill } from "react-icons/pi";

type Props = {
  currentTime: string;
  duration: string;
  playPause: () => void;
  controls: {
    playPause: () => void;
    skipBackward: () => void;
    skipForward: () => void;
  };
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

const PlaybackPanel = ({
  currentTime,
  duration,
  playPause,
  controls,
  isPlaying,
}: Props) => {
  return (
    <div className="bg-gray-700 rounded-lg py-1 px-7 flex justify-center items-center w-fit gap-2 opacity-80 hover:opacity-100 transition ease-in-out duration-100">
      <span className="w-12 text-gray-400 text-sm">{currentTime}</span>
      <button
        onClick={controls.skipBackward}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        <PiSkipBackFill size={20} />
      </button>
      {!isPlaying && (
        <button
          onClick={playPause}
          className="text-gray-200 filter hover:scale-110 active:brightness-110 rounded-full p-3 transition ease-in-out duration-100 flex justify-center items-center"
        >
          {<FaPlay size={30} className="mx-auto" />}
        </button>
      )}
      {isPlaying && (
        <button
          onClick={controls.playPause}
          className="text-gray-200 filter hover:scale-110 active:brightness-110 rounded-full p-3 transition ease-in-out duration-100 flex justify-center items-center"
        >
          {<FaPause size={30} className="mx-auto" />}
        </button>
      )}
      <button
        onClick={controls.skipForward}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        <PiSkipForwardFill size={20} />
      </button>
      <span className="w-12 text-gray-400 text-sm">{duration}</span>
    </div>
  );
};

export default PlaybackPanel;
