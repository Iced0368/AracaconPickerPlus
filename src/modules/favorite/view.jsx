import { FirstChildPortal, PackageContent, PackageItem } from "../../core/fragment";
import { FAVORITE_PACKAGE_ID } from "../../core/constants/config";
import { useElementStore } from "../../stores";
import { createPortal } from "react-dom";
import { getOverlay } from "../content/ThumbnailOverlay";

import FavoriteIcon from "../../assets/favorite-icon.svg?react";

import "./arcacon-favorite-icon.css";
import useFavoriteStore from "../../stores/favorite";

const STAR_SVG_DATA_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#FFD600"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>',
  );

export default function FavoriteView({ pickers, getToggleValue, toggleFavorite }) {
  const { favorites, isFavorite } = useFavoriteStore();
  const { thumbnailWraps } = useElementStore();

  return (
    <>
      {
        // 아카콘 패키지 선택 버튼
        pickers.map(
          (picker) =>
            picker.content && (
              <FirstChildPortal
                key={`content-${picker.uid}`}
                container={picker.content}
                className="--package-wrap"
                data-package-id={FAVORITE_PACKAGE_ID}
              >
                <PackageContent items={favorites} title="즐겨찾기" />
              </FirstChildPortal>
            ),
        )
      }
      {
        // 아카콘 패키지 아이템 표시
        pickers.map(
          (picker) =>
            picker.sidebar && (
              <FirstChildPortal
                key={`item-${picker.uid}`}
                container={picker.sidebar}
                className="package-item"
                data-package-id={FAVORITE_PACKAGE_ID}
                data-package-name="즐겨찾기"
                title="즐겨찾기"
              >
                <PackageItem id={FAVORITE_PACKAGE_ID} title="즐겨찾기" imgUrl={STAR_SVG_DATA_URL} />
              </FirstChildPortal>
            ),
        )
      }
      {
        // 즐겨찾기 토글 버튼 표시
        pickers.map(
          (picker) =>
            picker.optionsToolbar && (
              <FirstChildPortal
                fragment="label"
                key={`toggle-${picker.uid}`}
                container={picker.optionsToolbar}
                className="option-combo-emoticon visible"
                id="favorite-toggle-button"
              >
                즐겨찾기 토글
                <input
                  type="checkbox"
                  name="option-favorite-emoticon"
                  checked={getToggleValue(picker.uid) || false}
                  onChange={() => toggleFavorite(picker.uid)}
                />
              </FirstChildPortal>
            ),
        )
      }
      {
        // 즐겨찾기 아이콘 오버레이
        thumbnailWraps.map((node) => {
          if (!node) return null;
          const id = node.getAttribute("data-attachment-id");
          if (!isFavorite(id)) return null;
          const overlay = getOverlay(node);
          if (!overlay) return null;

          return createPortal(
            <div className="arcacon-overlay favorite">
              <FavoriteIcon />
            </div>,
            overlay,
          );
        })
      }
    </>
  );
}
