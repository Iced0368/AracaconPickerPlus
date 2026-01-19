import { create } from "zustand";
import { LOCAL_STORAGE_MEMO_DATA } from "../core/constants/config";
import GenericTable from "../utils/GenericTable";

const useMemoStore = create((set) => {
  let memoTable = new GenericTable("id", ["id", "text"]);

  const saveMemoItems = (items) => {
    localStorage.setItem(LOCAL_STORAGE_MEMO_DATA, JSON.stringify(items));
    console.log("[ArcaconPickerPlus] Saved memo data");
  };

  const loadMemoItems = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_MEMO_DATA) || "[]";
    console.log("[ArcaconPickerPlus] Loaded memo data");
    const arr = JSON.parse(data);
    memoTable = new GenericTable("id", ["id", "text"], arr);
    set({ memoItems: memoTable.getAll() });
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
    memoItems: [],
    getMemoById: (id) => memoTable.get(id),
    loadMemoItems,
    setMemoItem,
    deleteMemoItem,
  };
});

export default useMemoStore;
