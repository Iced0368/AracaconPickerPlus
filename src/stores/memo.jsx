import { create } from "zustand";
import GenericTable from "../utils/GenericTable";

// Zustand 스토어 기본 구조 예시
const useMemoStore = create((set) => {
  const MEMO_DATA = "arcacon-memos";
  let memoTable = new GenericTable("id", ["id", "imageUrl", "type", "poster", "orig", "text"]);

  const saveMemoItems = (items) => {
    localStorage.setItem(MEMO_DATA, JSON.stringify(items));
    console.log("[ArcaconPickerPlus] Saved memo data");
  };

  const loadMemoItems = () => {
    const data = localStorage.getItem(MEMO_DATA) || "[]";
    console.log("[ArcaconPickerPlus] Loaded memo data");
    const arr = JSON.parse(data);
    memoTable = new GenericTable("id", ["id", "imageUrl", "type", "poster", "orig", "text"], arr);
    set({ memoItems: memoTable.getAll() });
  };

  const setMemoItem = (arcacon, text) => {
    memoTable.insert({
      id: arcacon.id,
      imageUrl: arcacon.imageUrl,
      type: arcacon.type,
      poster: arcacon.poster,
      orig: arcacon.orig,
      text: text,
    });
    saveMemoItems(memoTable.getAll());
    set({ memoItems: memoTable.getAll() });
  };

  const deleteMemoItem = (rowOrId) => {
    const id = typeof rowOrId === "object" && rowOrId !== null ? rowOrId.id : rowOrId;
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
