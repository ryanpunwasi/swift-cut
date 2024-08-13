import { useState } from "react";
interface Controls {
  playPause: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  toggleMute: () => void;
}

export const useControls = (initialControls: Controls) => {
  const [controls, setControls] = useState(initialControls);

  return controls;
};
