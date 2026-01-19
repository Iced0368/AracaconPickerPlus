import { useEffect, useRef } from "react";
import { useMultiState } from "../../hooks";
import { useElementStore } from "../../stores";

import FavoriteController from "./controller";
import FavoriteView from "./view";

/*
  [즐겨찾기 모듈]
  - 즐겨찾기를 추가하고 즐겨찾기 패키지를 표시하는 모듈
  - 즐겨찾기 된 아카콘 오버레이 표시
*/

export default function FavoriteModule() {
  const { get: getToggle, set: setToggle, state: toggle } = useMultiState();
  const { pickers } = useElementStore();

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
