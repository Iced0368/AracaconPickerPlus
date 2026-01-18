import { useRef, useCallback } from "react";

export default function useDebounce(callback, delay = 300) {
  const timer = useRef();

  return useCallback(
    (...args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
