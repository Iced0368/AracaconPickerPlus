import { useState, useEffect, memo } from "react";
import MemoFragment from "./fragment/MemoFragment";
import { useElementStore } from "../../stores";
import { createPortal } from "react-dom";
import { getOverlay } from "../content";

import MemoIcon from "../../assets/memo-icon.svg?react";
import useMemoStore from "../../stores/memo";

import "./arcacon-memo-overlay.css";

export default function MemoView({ memoVisible, currentMemoId, openMemo, closeMemo, saveMemo, removeMemo }) {
  const { getMemoById } = useMemoStore();
  const { thumbnailWraps } = useElementStore();
  const [memoText, setMemoText] = useState("");

  useEffect(() => {
    if (memoVisible && currentMemoId) {
      const memo = getMemoById(currentMemoId);
      setMemoText(memo?.text || "");
    }
  }, [memoVisible, currentMemoId]);

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
          saveMemo(currentMemoId, memoText);
          setMemoText("");
          closeMemo();
        }}
        onRemove={() => {
          removeMemo(currentMemoId);
          setMemoText("");
          closeMemo();
        }}
      />
      {
        // 메모 아이콘 오버레이
        thumbnailWraps.map((node) => {
          if (!node) return null;
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
