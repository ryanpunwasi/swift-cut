import { useEffect } from "react";

export const useOutsideAlerter = (
  ref: any,
  cb: any,
  exclude: { target: any; cb: any } | null = null
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (exclude !== null)
        if (event.target.id === exclude.target.current.id && exclude.cb)
          exclude.cb();
      if (ref.current && !ref.current.contains(event.target)) cb();
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
