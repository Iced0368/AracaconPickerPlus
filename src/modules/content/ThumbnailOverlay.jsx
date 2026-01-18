import { createPortal } from "react-dom";
import { useElementStore } from "../../stores";

import "./overlay.css";

// .arcaconPicker 요소를 감지해 store에 저장하는 컴포넌트
export default function ThumbnailOverlay() {
  const thumbnailWraps = useElementStore((state) => state.thumbnailWraps);

  return (
    <>
      {thumbnailWraps.map((node) => {
        if (!node) return;
        if (!node.getAttribute) return;
        // 부모에 position: relative 적용 (이미 있으면 무시)
        if (node.style.position === "" || node.style.position === "static") {
          node.style.position = "relative";
        }
        return createPortal(<div className="arcacon-overlay-list"></div>, node);
      })}
    </>
  );
}

export function getOverlay(node) {
  if (!node) return null;
  return node.querySelector(".arcacon-overlay-list");
}
