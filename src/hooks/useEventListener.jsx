import { useEffect, useRef } from "react";

export default function useEventListener(event, handler, target = window, options, enabled = true) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled || !target?.addEventListener) return;

    const eventListener = (e) => savedHandler.current?.(e);
    target.addEventListener(event, eventListener, options);

    return () => {
      target.removeEventListener(event, eventListener, options);
    };
  }, [event, target, options, enabled]);
}
