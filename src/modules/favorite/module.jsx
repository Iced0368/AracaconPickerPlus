import { useEffect, useRef } from "react";
import { useMultiState } from "../../hooks";
import { useElementStore } from "../../stores";

import FavoriteController from "./controller";
import FavoriteView from "./view";

export default function FavoriteModule() {
  const { get: getToggle, set: setToggle, state: toggle } = useMultiState();
  const pickers = useElementStore((state) => state.pickers);

  const toggleRef = useRef(toggle);
  useEffect(() => {
    toggleRef.current = toggle;
  }, [toggle]);

  const getToggleValue = (uid) => toggleRef.current[uid];

  const toggleFavorite = (uid) => {
    const current = getToggleValue(uid) || false;
    setToggle(uid, !current);
  };

  return (
    <>
      <FavoriteView pickers={pickers} getToggleValue={getToggle} toggleFavorite={toggleFavorite} />
      <FavoriteController pickers={pickers} getToggleValue={getToggleValue} />
    </>
  );
}
