import { create } from "zustand";
import { STORAGE_ARCACON_DATA, STORAGE_FAVORITE_DATA, STORAGE_MEMO_DATA } from "../core/constants/config";
import { getDatabase, loadData, saveData, deleteData } from "./persistent";

import { GenericTable } from "../core/utils";

const arcaconIDBTable = getDatabase(STORAGE_ARCACON_DATA);
const relatedIDBTable = [STORAGE_FAVORITE_DATA, STORAGE_MEMO_DATA].map(getDatabase);

// id가 관련 테이블에 참조되지 않으면 arcacon에서 삭제하는 비동기 함수
export async function removeArcaconIfUnreferenced(id) {
  for (const dbTable of relatedIDBTable) {
    const item = await dbTable.get(id);
    if (item) {
      console.log(id, "is still referenced in", dbTable.name);
      return false; // 참조됨
    }
  }
  // 참조되지 않으면 arcacon에서 삭제
  await deleteData(arcaconIDBTable, id);
  return true;
}

const useArcaconStore = create(() => {
  const arcaconPernamentTable = new GenericTable("id", ["id", "emoticonid", "imageUrl", "type", "poster", "orig"]);
  const arcaconTemporaryTable = new GenericTable("id", ["id", "emoticonid", "imageUrl", "type", "poster", "orig"]);

  async function loadArcaconItems() {
    const data = (await loadData(arcaconIDBTable)) || [];
    arcaconPernamentTable.load(data);

    console.log("[ArcaconPickerPlus] Loaded arcacon items: ", data.length, "items loaded.");
  }

  function setArcaconItem({ id, emoticonid, imageUrl, type, poster, orig }, permanent = false) {
    const item = { id, emoticonid, imageUrl, type, poster, orig };
    if (permanent) {
      arcaconPernamentTable.insert(item);
      saveData(arcaconIDBTable, item);
    } else {
      arcaconTemporaryTable.insert(item);
    }
  }

  function deleteArcaconItem(id) {
    arcaconPernamentTable.delete(id);
    deleteData(arcaconIDBTable, id);
  }

  function setPermanent(id) {
    const item = arcaconTemporaryTable.get(id);
    if (item) {
      console.log("[ArcaconPickerPlus] Setting arcacon item as permanent: ", id);
      setArcaconItem(item, true);
    }
  }

  const getArcaconById = (id) => {
    return arcaconPernamentTable.get(id) || arcaconTemporaryTable.get(id);
  };

  return {
    loadArcaconItems,
    getArcaconById,
    setArcaconItem,
    setPermanent,
  };
});

export default useArcaconStore;
