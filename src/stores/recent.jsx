import { create } from "zustand";
import { STORAGE_RECENT_DATA, MAX_RECENT_ITEMS } from "../core/constants/config";
import { deleteData, getDatabase, loadData, saveData } from "./persistent";
import GenericTable from "../utils/GenericTable";

const recentIDBTable = getDatabase(STORAGE_RECENT_DATA);

const useRecentStore = create(() => {
  const recentTable = new GenericTable("id", ["id", "emoticonid", "timestamp"]);

  async function loadRecentItems() {
    const data = (await loadData(recentIDBTable)) || [];
    recentTable.load(data);

    console.log("[ArcaconPickerPlus] Loaded recent items: ", data.length, "items loaded.");
  }

  function addRecentItem(id, emoticonid) {
    if (emoticonid <= 0) return; // 유효하지 않은 이모티콘ID는 무시
    const item = { id, emoticonid, timestamp: Date.now() };
    recentTable.insert(item);

    // 최대 개수 초과 시 가장 오래된 항목 삭제
    while (recentTable.getAll().length > MAX_RECENT_ITEMS) {
      const oldestItem = recentTable.getAll().reduce((oldest, current) => {
        return current.timestamp < oldest.timestamp ? current : oldest;
      }, recentTable.getAll()[0]);

      recentTable.delete(oldestItem.id);
      deleteData(recentIDBTable, oldestItem.id);
    }

    saveData(recentIDBTable, item);
  }

  return {
    loadRecentItems,
    addRecentItem,
    getRecentById: (id) => recentTable.get(id),
  };
});

export default useRecentStore;
