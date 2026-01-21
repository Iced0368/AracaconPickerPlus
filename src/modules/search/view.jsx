import { useArcaconStore, useElementStore, useMemoStore } from "../../stores";
import { FirstChildPortal, PackageContent } from "../../core/fragment";
import { useDebounce } from "../../hooks";
import { SERACH_PACKAGE_ID } from "../../core/constants/config";

import SearchInputFragment from "./fragment/SearchInputFragment";

export default function SearchView({ getInputValue, setInputValue, keyword, getKeyword, setKeyword }) {
  const { pickers } = useElementStore();
  const { memoItems } = useMemoStore();
  const { getArcaconById } = useArcaconStore();

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
          picker.content.classList.remove("search-only");
          if (!kw) return null;
          if (!picker) return null;
          picker.content.classList.add("search-only");

          const searchResult = memoItems.reduce((acc, item) => (item.text.includes(kw) ? [...acc, item] : acc), []);
          return (
            <FirstChildPortal
              container={picker.content}
              className="--package-wrap"
              data-package-id={SERACH_PACKAGE_ID}
              key={`arcacon-search-result-${uid}`}
            >
              <PackageContent
                id={SERACH_PACKAGE_ID}
                title={`검색 결과: ${kw}, 총 ${searchResult.length}개`}
                items={searchResult.map((item) => getArcaconById(item.id))}
              />
            </FirstChildPortal>
          );
        })
      }
    </>
  );
}
