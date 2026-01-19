import { useEventListener } from "../../hooks";

export default function SearchController({ setInputValue, setKeyword }) {
  useEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".package-item")) {
      const uid = target.closest(".arcaconPicker")?.getAttribute("data-uid");
      setKeyword(uid, "");
      setInputValue(uid, "");
    }
  });

  return null;
}
