import { useEffect, useRef } from "react";
import { useEventListener } from "../../hooks";
import useMemoStore from "../../stores/memo";

export default function MemoController({ pickers, openMemo }) {
  const { loadMemoItems } = useMemoStore();

  const timerRef = useRef(null);
  const longPressEventRef = useRef(null);

  useEffect(() => {
    loadMemoItems();
  }, [loadMemoItems]);

  // .thumbnail-wrap에서 우클릭
  useEventListener(
    "contextmenu",
    (e) => {
      if (e.button !== 2) return; // 우클릭만 허용
      const target = e.target.closest(".thumbnail-wrap");
      if (!target) return;
      e.preventDefault();

      const id = target.getAttribute("data-attachment-id");
      const imageUrl = target.getAttribute("data-src");
      const type = target.getAttribute("data-type");
      const poster = target.getAttribute("data-poster");
      const orig = target.getAttribute("data-orig");

      openMemo({ id, imageUrl, type, poster, orig });
    },
    document,
    true,
  );

  // 터치 롱프레스 (모바일)
  useEventListener(
    "touchstart",
    (e) => {
      const target = e.target.closest(".thumbnail-wrap");
      if (!target) return;
      timerRef.current = setTimeout(() => {
        longPressEventRef.current = e;

        const id = target.getAttribute("data-attachment-id");
        const imageUrl = target.getAttribute("data-src");
        const type = target.getAttribute("data-type");
        const poster = target.getAttribute("data-poster");
        const orig = target.getAttribute("data-orig");

        openMemo({ id, imageUrl, type, poster, orig });
      }, 500);
    },
    document,
    true,
  );
  useEventListener(
    "touchend",
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
  useEventListener(
    "touchcancel",
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
