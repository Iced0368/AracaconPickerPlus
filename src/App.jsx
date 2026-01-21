import { ContentCollector, FavoriteModule, MemoModule, FixerModule, SearchModule, ThumbnailOverlay } from "./modules";

function App() {
  return (
    <>
      <ContentCollector />
      <ThumbnailOverlay />

      <FavoriteModule />
      <MemoModule />
      <SearchModule />
      <FixerModule />
    </>
  );
}

export default App;
