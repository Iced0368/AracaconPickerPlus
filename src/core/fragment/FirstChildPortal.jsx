import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function FirstChildPortal({
  children,
  fragment,
  container,
  className,
  title,
  ...restProps // data-* 등 기타 속성
}) {
  const mountNode = useRef(document.createElement(fragment || "div"));

  useLayoutEffect(() => {
    const node = mountNode.current;
    // 속성 할당
    if (className !== undefined) node.className = className;
    if (title !== undefined) node.title = title;
    // data-* 등 기타 속성
    Object.entries(restProps).forEach(([key, value]) => {
      if (key.startsWith("data-")) node.setAttribute(key, value);
    });

    if (container && node.parentNode !== container) {
      container.insertBefore(node, container.firstChild);
    }
    return () => {
      if (container && node.parentNode === container) {
        container.removeChild(node);
      }
    };
  }, [container, className, title, ...Object.values(restProps)]);

  return createPortal(children, mountNode.current);
}
