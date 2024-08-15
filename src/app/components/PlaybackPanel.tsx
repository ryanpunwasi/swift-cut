"use client";

import { useRef, useState } from "react";
import { useOutsideAlerter } from "../hooks/useOutsideClick.hook";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  FaVolumeHigh,
  FaVolumeXmark,
  FaMagnifyingGlassPlus,
} from "react-icons/fa6";

import { PiSkipForwardFill, PiSkipBackFill } from "react-icons/pi";

import { Tooltip } from "react-tooltip";
import WaveSurfer from "wavesurfer.js/dist/types.js";

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
  waveSurfer: any;
  disabled?: boolean;
};

const PlaybackPanel = ({
  currentTime,
  duration,
  playPause,
  controls,
  isPlaying,
  isMuted,
  waveSurfer,
  disabled,
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
        disabled={disabled}
        ref={volumeButtonRef}
        onClick={handleMuteToggle}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        {!isMuted && <FaVolumeHigh size={20} />}
        {isMuted && <FaVolumeXmark size={20} className="text-red-300" />}
      </button>
      <button
        disabled={disabled}
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
          disabled={disabled}
          onClick={playPause}
          className="w-12 text-gray-50 filter hover:scale-110 active:brightness-110 rounded-lg p-3 transition ease-in-out duration-100 flex justify-center items-center"
        >
          {<FaPlay size={25} className="mx-auto ml-1" />}
        </button>
      )}
      {isPlaying && (
        <button
          disabled={disabled}
          onClick={controls.playPause}
          className="w-12 text-gray-50 filter hover:scale-110 active:brightness-110 rounded-full p-3 transition ease-in-out duration-100 flex justify-center items-center"
        >
          {<FaPause size={25} className="mx-auto" />}
        </button>
      )}
      <button
        disabled={disabled}
        data-tooltip-id="skip-forward-toolip-identifier"
        data-tooltip-content="+5 seconds"
        ref={skipForwardButtonRef}
        onClick={handleSkipForward}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        <PiSkipForwardFill size={20} />
      </button>
      <ZoomControl waveSurfer={waveSurfer} disabled={disabled} />
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

const ZoomControl = ({
  waveSurfer,
  disabled,
}: {
  waveSurfer: WaveSurfer | null;
  disabled?: boolean;
}) => {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [sliderValue, setSliderValue] = useState("0");
  const zoomButtonRef = useRef<HTMLButtonElement | null>(null);

  useOutsideAlerter(
    wrapperRef,
    () => {
      setOpen(false);
    },
    { target: zoomButtonRef, cb: null }
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(e.target.value);
    waveSurfer?.zoom(Number(e.target.value));
  };
  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={`flex flex-col items-center justify-center mx-auto h-52 w-10 rounded-lg absolute bottom-14 z-30 bg-gray-700 transition duration-100 ease-in-out ${
          open ? "opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span className="absolute top-0">+</span>
        <span className="absolute bottom-0">-</span>
        <input
          disabled={disabled}
          type="range"
          id="zoom"
          name="zoom"
          min="1"
          max="100"
          value={sliderValue}
          onChange={handleOnChange}
          className="absolute h-3/4 w-10 my-auto outline-none"
          style={{
            writingMode: "vertical-lr",
            direction: "rtl",
            MozOrient: "vertical",
            WebkitWritingMode: "vertical-lr",
            WebkitAppearance: "slider-vertical",
          }}
        />
      </div>
      <button
        id="zoom-button"
        disabled={disabled}
        ref={zoomButtonRef}
        onClick={() => {
          setOpen(prev => !prev);
          zoomButtonRef.current?.blur();
        }}
        className="text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 transition ease-in-out duration-100"
      >
        <FaMagnifyingGlassPlus size={20} />
      </button>
    </div>
  );
};

export default PlaybackPanel;
