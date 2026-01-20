import { create } from "zustand";
import { STORAGE_FAVORITE_DATA } from "../core/constants/config";
import { loadData, saveData } from "./persistent";

import GenericTable from "../utils/GenericTable";

const useFavoriteStore = create((set) => {
  let favoriteTable = new GenericTable("id", ["id"]);

  const data = loadData(STORAGE_FAVORITE_DATA) || [];
  console.log("[ArcaconPickerPlus] Loaded favorite data");
  favoriteTable = new GenericTable("id", ["id"], data);

  const saveFavoriteItems = (items) => {
    saveData(STORAGE_FAVORITE_DATA, items);
    console.log("[ArcaconPickerPlus] Saved favorite data");
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
    favorites: favoriteTable.getAll(),
    isFavorite,
    addFavoriteItem,
    removeFavoriteItem,
  };
});

export default useFavoriteStore;
