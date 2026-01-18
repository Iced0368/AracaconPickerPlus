import { useEffect } from "react";
import { useElementStore } from "../../stores";

// .arcaconPicker 요소를 감지해 store에 저장하는 컴포넌트
export default function ContentCollector() {
  const { setArcaconPicker, setThumbnailWraps } = useElementStore();

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
    return { container: picker, titleArea, mainArea, optionsToolbar, sidebar, content, uid };
  };

  useEffect(() => {
    // MutationObserver로 동적 생성 감지
    const observer = new MutationObserver(() => {
      const pickers = document.querySelectorAll(".arcaconPicker");
      const newPickers = Array.from(pickers).map((picker) => getChildElements(picker));
      setArcaconPicker(newPickers);

      const thumbnails = document.querySelectorAll("img.thumbnail, video.thumbnail");
      const thumbnailWraps = Array.from(thumbnails).map((thumb) => thumb.closest(".thumbnail-wrap"));
      setThumbnailWraps(thumbnailWraps);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [setArcaconPicker, setThumbnailWraps]);

  return null; // 렌더링 없음
}

export function getUid(node) {
  if (!node) return null;
  const wrap = node.closest(".arcaconPicker");
  if (!wrap) return null;
  return wrap.getAttribute("data-uid");
}
