import { create } from "zustand";

// Zustand 스토어 기본 구조 예시
const useElementStore = create((set, get) => ({
  pickers: [],
  thumbnailWraps: [],
  setArcaconPicker: (_pickers) => set({ pickers: _pickers }),
  setThumbnailWraps: (_thumbnailWraps) => set({ thumbnailWraps: _thumbnailWraps }),
}));

export default useElementStore;
