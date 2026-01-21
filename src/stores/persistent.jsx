import Dexie from "dexie";
import {
  STORAGE_ARCACON_DATA,
  STORAGE_FAVORITE_DATA,
  STORAGE_MEMO_DATA,
  STORAGE_RECENT_DATA,
} from "../core/constants/config";

const db = new Dexie("ArcaconPickerPlusDB");
db.version(1).stores({
  [STORAGE_ARCACON_DATA]: "id,emoticonid,imageUrl,type,poster,orig",
  [STORAGE_FAVORITE_DATA]: "id",
  [STORAGE_MEMO_DATA]: "id,text",
  [STORAGE_RECENT_DATA]: "id,emoticonid,timestamp",
});

export function getDatabase(tableName) {
  return db[tableName];
}

export async function saveData(dbTable, item) {
  await dbTable.put(item);
}

export async function loadData(dbTable) {
  return await dbTable.toArray();
}

export async function deleteData(dbTable, key) {
  await dbTable.delete(key);
}
