import { create } from "zustand";
import { LOCAL_STORAGE_ARCACON_DATA } from "../core/constants/config";
import GenericTable from "../utils/GenericTable";

const useArcaconStore = create((set) => {
  let arcaconPernamentTable = new GenericTable("id", ["id", "emoticonid", "imageUrl", "type", "poster", "orig"]);
  let arcaconTemporaryTable = new GenericTable("id", ["id", "emoticonid", "imageUrl", "type", "poster", "orig"]);

  const saveArcaconPernamentItems = (items) => {
    localStorage.setItem(LOCAL_STORAGE_ARCACON_DATA, JSON.stringify(items));
    console.log("[ArcaconPickerPlus] Saved arcacon data");
    //const size = new Blob([JSON.stringify(items)]).size;
    //console.log(`[ArcaconPickerPlus] LocalStorage size: ${size} bytes`);
  };

  const loadArcaconPernamentItems = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_ARCACON_DATA) || "[]";
    console.log("[ArcaconPickerPlus] Loaded arcacon data");
    const arr = JSON.parse(data);
    arcaconPernamentTable = new GenericTable("id", ["id", "emoticonid", "imageUrl", "type", "poster", "orig"], arr);
    set({});
  };

  const setArcaconItem = ({ id, emoticonid, imageUrl, type, poster, orig }, permanent = false) => {
    if (emoticonid <= 0) return;
    if (permanent) {
      arcaconPernamentTable.insert({ id, emoticonid, imageUrl, type, poster, orig });
      saveArcaconPernamentItems(arcaconPernamentTable.getAll());
    } else {
      arcaconTemporaryTable.insert({ id, emoticonid, imageUrl, type, poster, orig });
    }
    set({});
  };

  const setPermanent = (id) => {
    const item = arcaconTemporaryTable.get(id);
    if (item) {
      console.log("[ArcaconPickerPlus] Setting arcacon item as permanent: ", id);
      setArcaconItem(item, true);
      set({});
    }
  };

  const getArcaconById = (id) => {
    return arcaconPernamentTable.get(id) || arcaconTemporaryTable.get(id);
  };

  return {
    getArcaconById,
    loadArcaconPernamentItems,
    setArcaconItem,
    setPermanent,
  };
});

export default useArcaconStore;
