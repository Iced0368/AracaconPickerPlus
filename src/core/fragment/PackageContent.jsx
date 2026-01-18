export default function PackageContent({ id, title, items }) {
  return (
    <>
      <span className="package-title">{title}</span>
      <div className="thumbnails">
        {items.map(
          (fav) =>
            (
              <div
                key={`thumbnail-wrap-favorite-${fav.id}`}
                className="thumbnail-wrap"
                data-type={fav.type || ""}
                data-src={fav.imageUrl || ""}
                data-emoticon-id={id}
                data-attachment-id={fav.id || ""}
                data-poster={fav.poster || ""}
                data-orig={fav.orig || ""}
              >
                {fav.type === "video" ? (
                  <video
                    className="thumbnail"
                    draggable="false"
                    data-emoticonid={id}
                    src={`${fav.imageUrl || ""}`}
                    poster={`${fav.poster || ""}`}
                    data-orig={`${fav.orig || ""}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                  ></video>
                ) : (
                  <img
                    className="thumbnail"
                    draggable="false"
                    src={fav.imageUrl || ""}
                    data-emoticonid={id}
                    data-attachmentid={fav.id || ""}
                  />
                )}
              </div>
            ) || null,
        )}
      </div>
    </>
  );
}
