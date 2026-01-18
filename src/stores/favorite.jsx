import { create } from "zustand";
import GenericTable from "../utils/GenericTable";

// Zustand 스토어 기본 구조 예시
const useFavoriteStore = create((set) => {
  const FAVORITE_DATA = "arcacon-favorites";
  let favoriteTable = new GenericTable("id", ["id", "imageUrl", "type", "poster", "orig"]);

  const saveFavoriteItems = (items) => {
    localStorage.setItem(FAVORITE_DATA, JSON.stringify(items));
    console.log("[ArcaconPickerPlus] Saved favorite data");
  };

  const loadFavoriteItems = () => {
    const data = localStorage.getItem(FAVORITE_DATA) || "[]";
    console.log("[ArcaconPickerPlus] Loaded favorite data");
    const arr = JSON.parse(data);
    favoriteTable = new GenericTable("id", ["id", "imageUrl", "type", "poster", "orig"], arr);
    set({ favoriteItems: favoriteTable.getAll() });
  };

  const addFavoriteItem = (id, imageUrl, type, poster, orig) => {
    favoriteTable.insert({ id, imageUrl, type, poster, orig });
    saveFavoriteItems(favoriteTable.getAll());
    set({ favoriteItems: favoriteTable.getAll() });
  };

  const removeFavoriteItem = (id) => {
    favoriteTable.delete(id);
    saveFavoriteItems(favoriteTable.getAll());
    set({ favoriteItems: favoriteTable.getAll() });
  };

  return {
    favoriteItems: [],
    getFavoriteById: (id) => favoriteTable.get(id),
    loadFavoriteItems,
    addFavoriteItem,
    removeFavoriteItem,
  };
});

export default useFavoriteStore;
