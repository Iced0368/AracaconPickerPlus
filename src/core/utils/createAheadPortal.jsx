import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function PortalAhead({ children, fragment, target, className, title, ...restProps }) {
  const containerRef = useRef(document.createElement(fragment || "div"));

  // 1. target이 바뀔 때만 container를 삽입/제거
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (target && target.parentNode) {
      target.parentNode.insertBefore(container, target);
    }
    /*
    return () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
    */
  }, [target]);

  // 2. 속성 할당은 별도 effect에서 관리
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (className !== undefined) container.className = className;
    if (title !== undefined) container.title = title;
    Object.entries(restProps).forEach(([key, value]) => {
      if (key.startsWith("data-")) container.setAttribute(key, value);
    });
  }, [className, title, ...Object.values(restProps)]);

  if (!target) return null;
  return createPortal(children, containerRef.current);
}
