import { useEventListener } from "../../hooks";

export default function MemoController({ openMemo }) {
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

  return null;
}
