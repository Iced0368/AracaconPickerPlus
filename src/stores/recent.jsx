import { create } from "zustand";
import { STORAGE_RECENT_DATA, MAX_RECENT_ITEMS } from "../core/constants/config";
import { loadData, saveData } from "./persistent";
import GenericTable from "../utils/GenericTable";

const useRecentStore = create(() => {
  let recentTable = new GenericTable("id", ["id", "emoticonid", "timestamp"]);

  const data = loadData(STORAGE_RECENT_DATA) || [];
  data.forEach((item) => {
    recentTable.insert(item);
  });

  const addRecentItem = (item) => {
    if (item.emoticonid <= 0) return; // 유효하지 않은 이모티콘ID는 무시
    item.timestamp = Date.now();
    recentTable.insert(item);

    // 최대 개수 초과 시 가장 오래된 항목 삭제
    while (recentTable.getAll().length > MAX_RECENT_ITEMS) {
      const oldestItem = recentTable.getAll().reduce((oldest, current) => {
        return current.timestamp < oldest.timestamp ? current : oldest;
      }, recentTable.getAll()[0]);
      recentTable.delete(oldestItem.id);
    }

    saveData(STORAGE_RECENT_DATA, recentTable.getAll());
  };

  return {
    addRecentItem,
    getRecentById: (id) => recentTable.get(id),
  };
});

export default useRecentStore;
