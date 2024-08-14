import { createContext } from "react";
import WaveSurfer from "wavesurfer.js/dist/types.js";

interface SurferContext {
  surfer: WaveSurfer | null;
  setSurfer:
    | React.Dispatch<React.SetStateAction<WaveSurfer | null>>
    | undefined;
}

export const surferContext = createContext<SurferContext>({
  surfer: null,
  setSurfer: undefined,
});
