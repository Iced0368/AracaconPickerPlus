import "./SearchInputFragment.css";

import ClearIcon from "../../../assets/clear-icon.svg?react";

export default function SearchInputFragment({ value, onChange }) {
  return (
    <>
      <span>메모 검색</span>
      <div className="arcacon-search-input-container">
        <input
          className="arcacon-search-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="검색어를 입력하세요"
        />
        {value && (
          <button
            type="button"
            className="arcacon-search-input-clear"
            onClick={() => onChange({ target: { value: "" } })}
            tabIndex={-1}
            aria-label="검색어 지우기"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    </>
  );
}
