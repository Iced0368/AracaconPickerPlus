import { useEffect } from "react";
import { useElementStore, useArcaconStore } from "../../stores";
import { useEventListener } from "../../hooks";

// .arcaconPicker 요소를 감지해 store에 저장하는 컴포넌트
export default function ContentCollector() {
  const { setArcaconPicker, setThumbnailWraps } = useElementStore();
  const { loadArcaconItems, setArcaconItem } = useArcaconStore();

  const getChildElements = (picker) => {
    // 고유 id 부여
    if (!picker.hasAttribute("data-uid")) {
      picker.setAttribute("data-uid", crypto.randomUUID());
    }
    const uid = picker.getAttribute("data-uid");

    const titleArea = picker.querySelector(".title-area");
    const mainArea = picker.querySelector(".main-area");
    const optionsToolbar = titleArea ? titleArea.querySelector(".options-toolbar") : null;
    const sidebar = mainArea ? mainArea.querySelector(".sidebar") : null;
    const content = mainArea ? mainArea.querySelector(".content") : null;
    return { self: picker, titleArea, mainArea, optionsToolbar, sidebar, content, uid };
  };

  // 렌더링 된 아카콘 데이터 저장
  const saveArcaconItem = (thumb) => {
    if (!thumb) return;
    const id = thumb.getAttribute("data-attachment-id"),
      emoticonid = thumb.getAttribute("data-emoticon-id"),
      imageUrl = thumb.getAttribute("data-src"),
      type = thumb.getAttribute("data-type"),
      poster = thumb.getAttribute("data-poster"),
      orig = thumb.getAttribute("data-orig");
    if (emoticonid > 0) {
      setArcaconItem({ id, emoticonid, imageUrl, type, poster, orig }, false);
    }
  };

  useEventListener(
    "click",
    (e) => {
      const target = e.target;
      if (target.classList.contains("thumbnail-wrap")) {
        console.log(target);
        saveArcaconItem(target);
      }
    },
    document,
  );

  useEffect(() => {
    loadArcaconItems();

    // MutationObserver로 동적 생성 감지
    const observer = new MutationObserver(() => {
      const pickers = document.querySelectorAll(".arcaconPicker");
      const newPickers = Array.from(pickers).map((picker) => getChildElements(picker));
      setArcaconPicker(newPickers);

      const thumbnails = document.querySelectorAll("img.thumbnail, video.thumbnail");
      const thumbnailWraps = Array.from(thumbnails).map((thumb) => thumb.closest(".thumbnail-wrap"));
      thumbnailWraps.forEach((wrap) => saveArcaconItem(wrap));
      setThumbnailWraps(thumbnailWraps);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null; // 렌더링 없음
}
