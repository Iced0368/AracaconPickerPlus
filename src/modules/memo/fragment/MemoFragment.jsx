import { useRef } from "react";
import "./MemoFragment.css";

import DeleteIcon from "../../../assets/delete-icon.svg?react";

export default function MemoFragment({ visible, text, onChange, onClose, onSave, onRemove }) {
  if (!visible) return null;

  // 엔터(shift+enter 제외)로 저장, esc로 취소
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // 클릭 후 배경에서 해제했을 때 닫히는 문제 방지
  const downOnOverlay = useRef(false);
  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      downOnOverlay.current = true;
    } else {
      downOnOverlay.current = false;
    }
  };
  const handleMouseUp = (e) => {
    if (e.target === e.currentTarget && downOnOverlay.current) {
      onClose();
    }
    downOnOverlay.current = false;
  };

  return (
    <div className="memo-modal-overlay" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <div className="memo-modal-box" onMouseUp={(e) => e.stopPropagation()}>
        <div
          className="memo-modal-title"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span>메모 작성</span>
          <button className="memo-modal-btn-remove" onClick={onRemove} title="메모 삭제">
            <DeleteIcon />
          </button>
        </div>
        <textarea
          className="memo-modal-textarea"
          value={text}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="memo-modal-actions">
          <button className="memo-modal-btn-cancel" onClick={onClose}>
            취소
          </button>
          <button className="memo-modal-btn-save" onClick={onSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
