"use client";
import { FaHeadphonesAlt } from "react-icons/fa";

const Download = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-900 text-gray-400 border-4 border-gray-800 gap-5 border-dashed rounded-lg flex flex-col justify-center items-center rounded-l w-96 h-48">
        <FaHeadphonesAlt className="text-gray-700" size={50} />
        <div className="flex flex-col items-center justify-center">
          <span className="font-normal">File name.mp3</span>
          <span className="uppercase font-light text-xs">mp3</span>
        </div>
      </div>
      <button className="flex items-center justify-center gap-2 w-fit bg-violet-700 rounded-lg mx-auto py-2 px-5 filter hover:brightness-125 transition duration-200 ease-in-out text-white text-sm font-light tracking-wider shadow-md cursor-pointer active:brightness-95 disabled:cursor-not-allowed disabled:select-none disabled:hover:brightness-75 disabled:brightness-75">
        Download
      </button>
    </div>
  );
};

export default Download;
