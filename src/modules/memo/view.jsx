import { useState, useEffect, memo } from "react";
import MemoFragment from "./fragment/MemoFragment";
import { useElementStore } from "../../stores";
import { createPortal } from "react-dom";
import { getOverlay } from "../content";

import MemoIcon from "../../assets/memo-icon.svg?react";
import useMemoStore from "../../stores/memo";

import "./arcacon-memo-overlay.css";

export default function MemoView({ memoVisible, currentMemo, openMemo, closeMemo, saveMemo, removeMemo }) {
  const { getMemoById } = useMemoStore();
  const thumbnailWraps = useElementStore((state) => state.thumbnailWraps);
  const [memoText, setMemoText] = useState("");

  useEffect(() => {
    if (memoVisible && currentMemo) {
      setMemoText(currentMemo.text || "");
    }
  }, [memoVisible, currentMemo]);

  const isMemoed = (id) => {
    return getMemoById(id) !== null;
  };

  return (
    <>
      <MemoFragment
        visible={memoVisible}
        text={memoText}
        onChange={(e) => setMemoText(e.target.value)}
        onClose={() => {
          setMemoText("");
          closeMemo();
        }}
        onSave={() => {
          saveMemo(currentMemo, memoText);
          setMemoText("");
          closeMemo();
        }}
        onRemove={() => {
          removeMemo(currentMemo);
          setMemoText("");
          closeMemo();
        }}
      />
      {
        // 메모 아이콘 오버레이
        thumbnailWraps.map((node) => {
          if (!node || !node.isConnected) return null;
          const id = node.getAttribute("data-attachment-id");
          if (!isMemoed(id)) return null;
          const overlay = getOverlay(node);
          if (!overlay) return null;

          return createPortal(
            <div className="arcacon-overlay memo">
              <MemoIcon />
            </div>,
            overlay,
          );
        })
      }
    </>
  );
}
