import useFavoriteStore from "../../stores/favorite";
import { useEffect } from "react";

export default function FavoriteController({ pickers, getToggleValue }) {
  const { getFavoriteById, loadFavoriteItems, addFavoriteItem, removeFavoriteItem } = useFavoriteStore();

  const handleClick = (uid) => (e) => {
    const target = e.target.closest(".thumbnail-wrap");

    if (target && getToggleValue(uid)) {
      e.stopPropagation();

      const id = target.getAttribute("data-attachment-id"),
        imageUrl = target.getAttribute("data-src"),
        type = target.getAttribute("data-type"),
        poster = target.getAttribute("data-poster"),
        orig = target.getAttribute("data-orig"),
        emoticonid = target.getAttribute("data-emoticon-id");

      if (getFavoriteById(id) !== null) {
        console.log("[ArcaconPickerPlus] Removing favorite: ", id);
        removeFavoriteItem(id);
      } else {
        console.log("[ArcaconPickerPlus] Adding favorite: ", id);
        addFavoriteItem(id, imageUrl, type, poster, orig);
      }
    }
  };

  useEffect(() => {
    loadFavoriteItems();
  }, []);

  useEffect(() => {
    const pickerListeners = pickers.map((picker) => {
      const listener = picker?.container.addEventListener("click", handleClick(picker.uid), true);
      return { picker, listener };
    });

    return () => {
      pickerListeners.forEach(({ picker, listener }) => {
        picker?.container.removeEventListener("click", listener, true);
      });
    };
  }, [pickers.length]);

  return null;
}
