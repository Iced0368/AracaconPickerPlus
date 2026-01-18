export default function PackageItem({ id, title, imgUrl }) {
  return (
    <>
      <div
        className="package-thumbnail"
        data-package-id={id}
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: 40,
          height: 40,
        }}
        onClick={(e) => {
          const t = e.target;
          const n = t.getAttribute("data-package-id");
          const a = t.closest(".arcaconPicker").querySelector('.content .--package-wrap[data-package-id="' + n + '"]');
          a && (a.parentElement.scrollTop = a.offsetTop);
        }}
      ></div>
    </>
  );
}
