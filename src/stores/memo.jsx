import { create } from "zustand";
import { STORAGE_MEMO_DATA } from "../core/constants/config";
import { getDatabase, loadData, saveData, deleteData } from "./persistent";

import GenericTable from "../utils/GenericTable";
import { removeArcaconIfUnreferenced } from "./arcacon";

const memoIDBTable = getDatabase(STORAGE_MEMO_DATA);

const useMemoStore = create((set) => {
  const memoTable = new GenericTable("id", ["id", "text"]);

  async function loadMemoItems() {
    const data = (await loadData(memoIDBTable)) || [];
    memoTable.load(data);
    set({ memoItems: memoTable.getAll() });

    console.log("[ArcaconPickerPlus] Loaded memo items: ", data.length, "items loaded.");
  }

  function setMemoItem(id, text) {
    memoTable.insert({ id, text });
    saveData(memoIDBTable, { id, text });
    set({ memoItems: memoTable.getAll() });
  }

  function deleteMemoItem(id) {
    memoTable.delete(id);
    deleteData(memoIDBTable, id).then(() => {
      removeArcaconIfUnreferenced(id);
    });
    set({ memoItems: memoTable.getAll() });
  }

  return {
    memoItems: [],
    loadMemoItems,
    setMemoItem,
    deleteMemoItem,
    getMemoById: (id) => memoTable.get(id),
  };
});

export default useMemoStore;
