import { useElementStore } from "../../stores";
import { FirstChildPortal, PackageContent } from "../../core/fragment";
import SearchInputFragment from "./fragment/SearchInputFragment";
import { useDebounce, useMultiState } from "../../hooks";
import useMemoStore from "../../stores/memo";
import { SERACH_PACKAGE_ID } from "../../core/constants/config";
import { createPortal } from "react-dom";

export default function SearchView({ keyword, getKeyword, setKeyword, memoMap }) {
  const pickers = useElementStore((state) => state.pickers);
  const { memoItems } = useMemoStore();
  const { get: getInputValue, set: setInputValue } = useMultiState("");

  const updateKeyword = useDebounce(setKeyword, 300);

  return (
    <>
      {pickers.map((picker) => {
        const node = picker.optionsToolbar;
        if (!node) return null;

        return (
          <FirstChildPortal
            key={`arcacon-search-${picker.uid}`}
            className="arcacon-search-input-container"
            container={node}
          >
            <SearchInputFragment
              value={getInputValue(picker.uid)}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(picker.uid, value);
                updateKeyword(picker.uid, value);
              }}
            />
          </FirstChildPortal>
        );
      })}
      {
        // 검색어 유무에 따라 콘텐츠 표시 여부 제어
        Object.entries(keyword).map(([uid, kw]) => {
          const picker = pickers.find((p) => p.uid === uid);
          picker.content.classList.remove("content-hidden");
          if (!kw) return null;
          if (!picker) return null;
          picker.content.classList.add("content-hidden");

          const searchResult = memoItems.reduce((acc, item) => (item.text.includes(kw) ? [...acc, item] : acc), []);

          const node = picker.mainArea.querySelector(".wrap");

          return createPortal(
            <div className="content" key={`arcacon-search-result-${uid}`}>
              <div className="--package-wrap" data-package-id={SERACH_PACKAGE_ID}>
                <PackageContent
                  id={SERACH_PACKAGE_ID}
                  title={`검색 결과: ${kw}, 총 ${searchResult.length}개`}
                  items={searchResult.filter((item) => item !== null)}
                />
              </div>
            </div>,
            node,
          );
        })
      }
    </>
  );
}
