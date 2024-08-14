"use client";
import { useState } from "react";
import { surferContext } from "../context/SurferContext";
import WaveSurfer from "wavesurfer.js";

interface Props {
  children: JSX.Element;
  waveSurfer: WaveSurfer;
}

const SurferContext = ({ children, waveSurfer }: Props) => {
  const [surfer, setSurfer] = useState<WaveSurfer | null>(waveSurfer);
  return (
    <surferContext.Provider value={{ surfer, setSurfer }}>
      {children}
    </surferContext.Provider>
  );
};

export default SurferContext;
