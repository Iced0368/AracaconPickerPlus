import { useMultiState } from "../../hooks";

import SearchView from "./view";
import SearchController from "./controller";

/*
  [검색 모듈]
  - 검색 기능을 추가하고 검색 결과를 표시하는 모듈
  - 메모 중 키워드를 포함하는 아카콘 표시
*/

export default function SearchModule() {
  const { get: getInputValue, set: setInputValue, state: inputValue } = useMultiState("");
  const { get: getKeyword, set: setKeyword, state: keyword } = useMultiState("");
  return (
    <>
      <SearchView
        inputValue={inputValue}
        getInputValue={getInputValue}
        setInputValue={setInputValue}
        keyword={keyword}
        getKeyword={getKeyword}
        setKeyword={setKeyword}
      />
      <SearchController setInputValue={setInputValue} setKeyword={setKeyword} />
    </>
  );
}
