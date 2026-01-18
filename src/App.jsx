import { ContentCollector, FavoriteModule, MemoModule, SearchModule, ThumbnailOverlay } from "./modules";

function App() {
  return (
    <>
      <ContentCollector />
      <ThumbnailOverlay />

      <FavoriteModule />
      <MemoModule />
      <SearchModule />
    </>
  );
}

export default App;
