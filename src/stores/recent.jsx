import { create } from "zustand";
import { LOCAL_STORAGE_RECENT_DATA, MAX_RECENT_ITEMS } from "../core/constants/config";

// 최근 n개만 저장, 중복 데이터는 맨 뒤로 이동
class FixedSizeQueue {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
  }
  push(item) {
    const idx = this.queue.indexOf(item);
    if (idx !== -1) {
      this.queue.splice(idx, 1); // 기존 위치에서 제거
    }
    this.queue.push(item);
    if (this.queue.length > this.limit) {
      this.queue.shift();
    }
  }
  get items() {
    return this.queue;
  }
  clear() {
    this.queue = [];
  }
}

const useRecentStore = create((set) => {
  const recentQueue = new FixedSizeQueue(MAX_RECENT_ITEMS);
  const emoticonIdMap = new Map();

  const loadRecentItems = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_RECENT_DATA) || "[]";
    const items = JSON.parse(data);

    items.forEach((item) => {
      recentQueue.push(item);
      emoticonIdMap.set(item.id, item);
    });
  };

  const addRecentItem = (item) => {
    recentQueue.push(item);
    localStorage.setItem(LOCAL_STORAGE_RECENT_DATA, JSON.stringify(recentQueue.items));
    set({});
  };

  return {
    loadRecentItems,
    addRecentItem,
    getRecentById: (id) => emoticonIdMap.get(id),
  };
});

export default useRecentStore;
