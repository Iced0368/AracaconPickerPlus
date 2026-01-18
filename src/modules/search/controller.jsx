import { useEventListener } from "../../hooks";

export default function SearchController({ setKeyword }) {
  useEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".package-item")) {
      const uid = target.closest(".arcaconPicker")?.getAttribute("data-uid");
      setKeyword(uid, "");
    }
  });

  return null;
}
