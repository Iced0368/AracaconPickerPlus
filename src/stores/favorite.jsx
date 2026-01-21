import { create } from "zustand";
import { STORAGE_FAVORITE_DATA } from "../core/constants/config";
import { getDatabase, loadData, saveData, deleteData } from "./persistent";

import GenericTable from "../core/utils/GenericTable";
import { removeArcaconIfUnreferenced } from "./arcacon";

const favoriteIDBTable = getDatabase(STORAGE_FAVORITE_DATA);

const useFavoriteStore = create((set) => {
  const favoriteTable = new GenericTable("id", ["id"]);

  async function loadFavoriteItems() {
    const data = (await loadData(favoriteIDBTable)) || [];
    favoriteTable.load(data);
    set({ favorites: favoriteTable.getAll() });

    console.log("[ArcaconPickerPlus] Loaded favorite items: ", data.length, "items loaded.");
  }

  function addFavoriteItem(id) {
    favoriteTable.insert({ id });
    saveData(favoriteIDBTable, { id });
    set({ favorites: favoriteTable.getAll() });
  }

  function removeFavoriteItem(id) {
    favoriteTable.delete(id);
    deleteData(favoriteIDBTable, id).then(() => {
      removeArcaconIfUnreferenced(id);
    });
    set({ favorites: favoriteTable.getAll() });
  }

  return {
    favorites: [],
    loadFavoriteItems,
    addFavoriteItem,
    removeFavoriteItem,
    isFavorite: (id) => favoriteTable.get(id) !== null,
  };
});

export default useFavoriteStore;
