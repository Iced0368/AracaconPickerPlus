import { create } from "zustand";
import { STORAGE_ARCACON_DATA } from "../core/constants/config";
import { loadData, saveData } from "./persistent";

import GenericTable from "../utils/GenericTable";

const useArcaconStore = create(() => {
  let arcaconPernamentTable = new GenericTable("id", ["id", "emoticonid", "imageUrl", "type", "poster", "orig"]);
  let arcaconTemporaryTable = new GenericTable("id", ["id", "emoticonid", "imageUrl", "type", "poster", "orig"]);

  const data = loadData(STORAGE_ARCACON_DATA) || [];
  console.log("[ArcaconPickerPlus] Loaded arcacon data");
  arcaconPernamentTable = new GenericTable("id", ["id", "emoticonid", "imageUrl", "type", "poster", "orig"], data);

  const saveArcaconPernament = (items) => {
    saveData(STORAGE_ARCACON_DATA, items);
    console.log("[ArcaconPickerPlus] Saved arcacon data");
  };

  const setArcaconItem = ({ id, emoticonid, imageUrl, type, poster, orig }, permanent = false) => {
    if (emoticonid <= 0) return;
    if (permanent) {
      arcaconPernamentTable.insert({ id, emoticonid, imageUrl, type, poster, orig });
      saveArcaconPernament(arcaconPernamentTable.getAll());
    } else {
      arcaconTemporaryTable.insert({ id, emoticonid, imageUrl, type, poster, orig });
    }
  };

  const setPermanent = (id) => {
    const item = arcaconTemporaryTable.get(id);
    if (item) {
      console.log("[ArcaconPickerPlus] Setting arcacon item as permanent: ", id);
      setArcaconItem(item, true);
    }
  };

  const getArcaconById = (id) => {
    return arcaconPernamentTable.get(id) || arcaconTemporaryTable.get(id);
  };

  return {
    getArcaconById,
    setArcaconItem,
    setPermanent,
  };
});

export default useArcaconStore;
