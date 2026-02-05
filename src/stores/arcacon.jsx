import { create } from "zustand";
import { STORAGE_ARCACON_DATA, STORAGE_FAVORITE_DATA, STORAGE_MEMO_DATA } from "../core/constants/config";
import { getDatabase, loadData, saveData, deleteData, batchSaveData } from "./persistent";

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

    // 만료된 아카콘 아이템을 확인하고 갱신 요청
    // expires 파라미터 추출용 정규식
    const expiresRegex = /[?&]expires=(\d+)/;
    const now = Math.floor(Date.now() / 1000);
    const expiredEmoticonIds = new Set();

    data.forEach((item) => {
      const urls = [item.imageUrl, item.orig, item.poster];
      for (const url of urls) {
        if (typeof url === "string") {
          const match = url.match(expiresRegex);
          if (match) {
            const expires = parseInt(match[1], 10);
            if (expires < now) {
              if (item.emoticonid) expiredEmoticonIds.add(item.emoticonid);
              break; // 하나라도 만료면 체크
            }
          }
        }
      }
    });

    console.log(expiredEmoticonIds);

    const arcaconIds = new Set(data.map((item) => item.id.toString()));
    const arcaconToRefresh = [];

    await Promise.all(
      Array.from(expiredEmoticonIds).map((emoticonid) => {
        if (emoticonid <= 0) return;
        return fetch(`/api/emoticon2/${emoticonid}`)
          .then((response) => response.json())
          .then((emoticonData) => {
            emoticonData.forEach((arcacon) => {
              if (arcaconIds.has(arcacon.id.toString())) {
                arcaconToRefresh.push({ ...arcacon, id: arcacon.id.toString() });
              }
            });
          })
          .catch((error) => {
            console.error("[ArcaconPickerPlus] Failed to refresh arcacon item: ", emoticonid, error);
          });
      }),
    );

    console.log("[ArcaconPickerPlus] Expired arcacon items to refresh: ", arcaconToRefresh.length);
    if (arcaconToRefresh.length > 0) {
      await batchSaveData(arcaconIDBTable, arcaconToRefresh);

      // 갱신된 아이템을 영구 테이블에도 반영
      arcaconToRefresh.forEach((item) => {
        arcaconPernamentTable.insert(item);
      });
    }

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

  const getArcaconById = (id, permanentOnly = false) => {
    return permanentOnly
      ? arcaconPernamentTable.get(id)
      : arcaconPernamentTable.get(id) || arcaconTemporaryTable.get(id);
  };

  return {
    loadArcaconItems,
    getArcaconById,
    setArcaconItem,
    setPermanent,
  };
});

export default useArcaconStore;
