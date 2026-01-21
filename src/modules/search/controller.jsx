import { useEventListener } from "../../hooks";

export default function SearchController({ setInputValue, setKeyword }) {
  useEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".package-item")) {
      const uid = target.closest(".arcaconPicker")?.getAttribute("data-uid");
      setKeyword(uid, "");
      setInputValue(uid, "");

      setTimeout(() => {
        const t = e.target;
        const n = t.getAttribute("data-package-id");
        const a = t
          .closest(".arcaconPicker")
          .querySelector(
            `.content [data-package-id="${n}"].package-wrap, .content [data-package-id="${n}"].--package-wrap`,
          );
        a && (a.parentElement.scrollTop = a.offsetTop);
      }, 100);
    }
  });

  return null;
}
