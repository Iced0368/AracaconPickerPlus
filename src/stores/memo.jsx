import { create } from "zustand";
import { STORAGE_MEMO_DATA } from "../core/constants/config";
import { loadData, saveData } from "./persistent";

import GenericTable from "../utils/GenericTable";

const useMemoStore = create((set) => {
  let memoTable = new GenericTable("id", ["id", "text"]);

  const data = loadData(STORAGE_MEMO_DATA) || [];
  memoTable = new GenericTable("id", ["id", "text"], data);

  const saveMemoItems = (items) => {
    saveData(STORAGE_MEMO_DATA, items);
    console.log("[ArcaconPickerPlus] Saved memo data");
  };

  const setMemoItem = (id, text) => {
    memoTable.insert({ id, text });
    saveMemoItems(memoTable.getAll());
    set({ memoItems: memoTable.getAll() });
  };

  const deleteMemoItem = (id) => {
    memoTable.delete(id);
    saveMemoItems(memoTable.getAll());
    set({ memoItems: memoTable.getAll() });
  };

  return {
    memoItems: memoTable.getAll(),
    getMemoById: (id) => memoTable.get(id),
    setMemoItem,
    deleteMemoItem,
  };
});

export default useMemoStore;
