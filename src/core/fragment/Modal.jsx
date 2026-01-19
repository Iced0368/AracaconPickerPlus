import React, { useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, id, onClickBackground }) {
  // 클릭 후 배경에서 해제했을 때 닫히는 문제 방지
  const downOnOverlay = useRef(false);

  const handleMouseDown = (e) => {
    downOnOverlay.current = true;
  };

  const handleMouseUp = (e) => {
    if (e.target === e.currentTarget && downOnOverlay.current) {
      onClickBackground();
    }
    downOnOverlay.current = false;
  };

  return (
    <div className="microModal is-open is-last" aria-hidden="false" id={`modal_${id}`}>
      <div tabIndex="-1" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <div role="dialog" className="arca-dialog" aria-modal="true">
          {children}
        </div>
      </div>
    </div>
  );
}

function Title({ children }) {
  return <h1 className="microModal-title">{children}</h1>;
}

function Content({ children }) {
  return <div className="microModal-content">{children}</div>;
}

function Buttons({ children }) {
  return <div className="microModal-buttons">{children}</div>;
}

Modal.Title = Title;
Modal.Content = Content;
Modal.Buttons = Buttons;

function createModal(modal) {
  return createPortal(modal, document.body);
}

export { Modal, createModal };
