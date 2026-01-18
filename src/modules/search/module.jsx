import { useState } from "react";
import SearchView from "./view";
import { useMultiState } from "../../hooks";

// 로컬스토리지 키
const STORAGE_KEY = "arcacon-memo-map";

function loadMemoMap() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

export default function SearchModule() {
  const { get: getKeyword, set: setKeyword, state: keyword } = useMultiState("");
  const [memoMap, _] = useState(() => loadMemoMap());

  return (
    <>
      <SearchView keyword={keyword} getKeyword={getKeyword} setKeyword={setKeyword} memoMap={memoMap} />
    </>
  );
}
