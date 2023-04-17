import { useRef, useCallback } from "react";

const useSingleAndDoubleTap = (singleTapCallback, doubleTapCallback) => {
  const tapRef = useRef(0);
  const tapTimeout = useRef(null);

  const handleClick = useCallback(
    (e) => {
      tapRef.current += 1;
      if (tapTimeout.current === null) {
        tapTimeout.current = setTimeout(() => {
          if (tapRef.current === 1) {
            singleTapCallback(e);
          } else if (tapRef.current === 2) {
            doubleTapCallback(e);
          }
          tapRef.current = 0;
          tapTimeout.current = null;
        }, 200);
      }
    },
    [singleTapCallback, doubleTapCallback]
  );

  return handleClick;
};

export default useSingleAndDoubleTap;
