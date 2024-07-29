import { useRef, useEffect } from "react";

export const useOutsideAlerter = (ref: any, cb: any) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      console.log(ref.current, event.target);
      if (ref.current && !ref.current.contains(event.target)) cb();
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
