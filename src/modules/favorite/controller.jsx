import { useArcaconStore } from "../../stores";
import useFavoriteStore from "../../stores/favorite";
import { useEffect } from "react";

export default function FavoriteController({ pickers, getToggleValue }) {
  const { isFavorite, addFavoriteItem, removeFavoriteItem } = useFavoriteStore();
  const { setPermanent } = useArcaconStore();

  const handleClick = (uid) => (e) => {
    const target = e.target.closest(".thumbnail-wrap");

    if (target && getToggleValue(uid)) {
      e.stopPropagation();

      const id = target.getAttribute("data-attachment-id");

      if (isFavorite(id)) {
        console.log("[ArcaconPickerPlus] Removing favorite: ", id);
        removeFavoriteItem(id);
      } else {
        console.log("[ArcaconPickerPlus] Adding favorite: ", id);
        addFavoriteItem(id);
        setPermanent(id);
      }
    }
  };

  useEffect(() => {
    const pickerListeners = pickers.map((picker) => {
      const listener = picker?.self.addEventListener("click", handleClick(picker.uid), true);
      return { picker, listener };
    });

    return () => {
      pickerListeners.forEach(({ picker, listener }) => {
        picker?.self.removeEventListener("click", listener, true);
      });
    };
  }, [pickers.length]);

  return null;
}
