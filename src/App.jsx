import { ContentCollector, FavoriteModule, MemoModule, RecentModule, SearchModule, ThumbnailOverlay } from "./modules";

function App() {
  return (
    <>
      <ContentCollector />
      <ThumbnailOverlay />

      <FavoriteModule />
      <MemoModule />
      <SearchModule />
      <RecentModule />
    </>
  );
}

export default App;
