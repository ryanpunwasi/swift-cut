"use client";

import { useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  FaVolumeHigh,
  FaVolumeXmark,
  FaMagnifyingGlassPlus,
} from "react-icons/fa6";

import { PiSkipForwardFill, PiSkipBackFill } from "react-icons/pi";

import { Tooltip } from "react-tooltip";

type Props = {
  currentTime: string;
  duration: string;
  playPause: () => void;
  controls: {
    playPause: () => void;
    skipBackward: () => void;
    skipForward: () => void;
    toggleMute: () => void;
  };
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isMuted: boolean;
};

const PlaybackPanel = ({
  currentTime,
  duration,
  playPause,
  controls,
  isPlaying,
  isMuted,
}: Props) => {
  const skipBackButtonRef = useRef<HTMLButtonElement | null>(null);
  const skipForwardButtonRef = useRef<HTMLButtonElement | null>(null);
  const volumeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSkipBackward = () => {
    controls.skipBackward();
    skipBackButtonRef.current?.blur();
  };

  const handleSkipForward = () => {
    controls.skipForward();
    skipForwardButtonRef.current?.blur();
  };

  const handleMuteToggle = () => {
    controls.toggleMute();
    volumeButtonRef.current?.blur();
  };

  return (
    <div className="bg-gray-700 rounded-lg py-1 px-7 flex justify-center items-center w-fit gap-2 opacity-80 hover:opacity-100 transition ease-in-out duration-100">
      <span className="w-12 text-gray-400 text-sm flex justify-center">
        {currentTime}
      </span>
      <button
        ref={volumeButtonRef}
        onClick={handleMuteToggle}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        {!isMuted && <FaVolumeHigh size={20} />}
        {isMuted && <FaVolumeXmark size={20} className="text-red-300" />}
      </button>
      <button
        data-tooltip-id="skip-backward-toolip-identifier"
        data-tooltip-content="-5 seconds"
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
        data-tooltip-id="skip-forward-toolip-identifier"
        data-tooltip-content="+5 seconds"
        ref={skipForwardButtonRef}
        onClick={handleSkipForward}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        <PiSkipForwardFill size={20} />
      </button>
      <button className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100">
        <FaMagnifyingGlassPlus size={20} />
      </button>
      <span className="w-12 text-gray-400 text-sm flex justify-center">
        {duration}
      </span>
      <Tooltip
        id="skip-forward-toolip-identifier"
        place="top"
        opacity={0.6}
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "15px",
        }}
      />
      <Tooltip
        id="skip-backward-toolip-identifier"
        place="top"
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

export default PlaybackPanel;
