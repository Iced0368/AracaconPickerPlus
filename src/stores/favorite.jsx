import { create } from "zustand";
import { LOCAL_STORAGE_FAVORITE_DATA } from "../core/constants/config";
import GenericTable from "../utils/GenericTable";

const useFavoriteStore = create((set) => {
  let favoriteTable = new GenericTable("id", ["id"]);

  const saveFavoriteItems = (items) => {
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_DATA, JSON.stringify(items));
    console.log("[ArcaconPickerPlus] Saved favorite data");
  };

  const loadFavoriteItems = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_FAVORITE_DATA) || "[]";
    console.log("[ArcaconPickerPlus] Loaded favorite data");
    const arr = JSON.parse(data);
    favoriteTable = new GenericTable("id", ["id"], arr);
    set({ favorites: favoriteTable.getAll() });
  };

  const addFavoriteItem = (id) => {
    favoriteTable.insert({ id });
    saveFavoriteItems(favoriteTable.getAll());
    set({ favorites: favoriteTable.getAll() });
  };

  const removeFavoriteItem = (id) => {
    favoriteTable.delete(id);
    saveFavoriteItems(favoriteTable.getAll());
    set({ favorites: favoriteTable.getAll() });
  };

  const isFavorite = (id) => {
    return favoriteTable.get(id) !== null;
  };

  return {
    favorites: [],
    isFavorite,
    loadFavoriteItems,
    addFavoriteItem,
    removeFavoriteItem,
  };
});

export default useFavoriteStore;
