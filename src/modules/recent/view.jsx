import { useElementStore, useRecentStore } from "../../stores";

export default function RecentView() {
  const { thumbnailWraps } = useElementStore();
  const { getRecentById } = useRecentStore();

  thumbnailWraps.forEach((node) => {
    if (!node) return;
    const id = node.getAttribute("data-attachment-id");
    const emoticonid = node.getAttribute("data-emoticon-id");

    if (emoticonid <= 0) {
      const trueEmoticonId = getRecentById(id)?.emoticonid;
      if (trueEmoticonId) {
        node.setAttribute("data-emoticon-id", trueEmoticonId);
      } else {
        node.classList.add("--arcacon-not-found");
      }
    }
  });

  return null;
}
