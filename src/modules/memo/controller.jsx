import { useEffect, useRef } from "react";
import { useEventListener } from "../../hooks";
import { useMemoStore } from "../../stores";

export default function MemoController({ openMemo }) {
  const timerRef = useRef(null);
  const longPressEventRef = useRef(null);

  // .thumbnail-wrap에서 우클릭
  useEventListener(
    "contextmenu",
    (e) => {
      const target = e.target.closest(".thumbnail-wrap");
      if (!target) return;
      e.preventDefault();

      const id = target.getAttribute("data-attachment-id");
      openMemo(id);
    },
    document,
    true,
  );

  // 터치 롱프레스 (모바일)
  useEventListener(
    "pointerdown",
    (e) => {
      const target = e.target.closest(".thumbnail-wrap");
      if (!target) return;
      timerRef.current = setTimeout(() => {
        longPressEventRef.current = e;
        const id = target.getAttribute("data-attachment-id");
        openMemo(id);
      }, 500);
    },
    document,
    true,
  );
  useEventListener(
    "pointerup",
    (e) => {
      clearTimeout(timerRef.current);
      if (longPressEventRef.current) {
        e.preventDefault();
        e.stopPropagation();
        longPressEventRef.current = null;
      }
    },
    document,
    true,
  );

  return null;
}
