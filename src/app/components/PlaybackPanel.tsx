"use client";

import { useRef } from "react";
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
  const skipBackButtonRef = useRef<HTMLButtonElement | null>(null);
  const skipForwardButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSkipBackward = () => {
    controls.skipBackward();
    skipBackButtonRef.current?.blur();
  };

  const handleSkipForward = () => {
    controls.skipForward();
    skipForwardButtonRef.current?.blur();
  };

  return (
    <div className="bg-gray-700 rounded-lg py-1 px-7 flex justify-center items-center w-fit gap-2 opacity-80 hover:opacity-100 transition ease-in-out duration-100">
      <span className="w-12 text-gray-400 text-sm">{currentTime}</span>
      <button
        ref={skipBackButtonRef}
        onClick={handleSkipBackward}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        <PiSkipBackFill size={20} />
      </button>
      {!isPlaying && (
        <button
          onClick={playPause}
          className="w-12 text-gray-50 filter hover:scale-110 active:brightness-110 rounded-lg p-3 transition ease-in-out duration-100 flex justify-center items-center"
        >
          {<FaPlay size={25} className="mx-auto ml-1" />}
        </button>
      )}
      {isPlaying && (
        <button
          onClick={controls.playPause}
          className="w-12 text-gray-50 filter hover:scale-110 active:brightness-110 rounded-full p-3 transition ease-in-out duration-100 flex justify-center items-center"
        >
          {<FaPause size={25} className="mx-auto" />}
        </button>
      )}
      <button
        ref={skipForwardButtonRef}
        onClick={handleSkipForward}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        <PiSkipForwardFill size={20} />
      </button>
      <span className="w-12 text-gray-400 text-sm">{duration}</span>
    </div>
  );
};

export default PlaybackPanel;
