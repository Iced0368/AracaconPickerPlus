import { useEffect } from "react";
import useFetchHook from "../../hooks/useFetchHook";
import useRecentStore from "../../stores/recent";

export default function RecentController() {
  const { loadRecentItems, addRecentItem } = useRecentStore();

  useEffect(() => {
    loadRecentItems();
  }, [loadRecentItems]);

  useFetchHook(/\/b\/([^/]+)\/\d+\/comment/, (args) => {
    const body = args[1]?.body;

    let parsed = {};
    if (typeof body === "string" && body.includes("=")) {
      parsed = Object.fromEntries(new URLSearchParams(body));
    }

    // 아카콘 단일
    if (parsed.contentType === "emoticon") {
      const id = parsed.attachmentId;
      const emoticonid = parsed.emoticonId;
      addRecentItem({ id, emoticonid });
    }
    // 콤포콘
    else if (parsed.contentType === "combo_emoticon") {
      const combolist = JSON.parse(parsed.combolist).map((item) => ({ id: item[1], emoticonid: item[0] }));
      combolist.forEach(({ id, emoticonid }) => {
        addRecentItem({ id, emoticonid });
      });
    }

    return undefined;
  });
  return null;
}
