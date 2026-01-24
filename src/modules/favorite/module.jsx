import { useEffect, useRef } from "react";
import { useMultiState } from "../../hooks";
import { useArcaconStore, useElementStore, useFavoriteStore } from "../../stores";

import FavoriteController from "./controller";
import FavoriteView from "./view";

/*
  [즐겨찾기 모듈]
  - 즐겨찾기를 추가하고 즐겨찾기 패키지를 표시하는 모듈
  - 즐겨찾기 된 아카콘 오버레이 표시
*/

import { useState } from "react";

export default function FavoriteModule() {
  const { loadFavoriteItems } = useFavoriteStore();
  const { pickers } = useElementStore();
  const { get: getToggle, set: setToggle, state: toggle } = useMultiState();
  const { isFavorite, addFavoriteItem, removeFavoriteItem } = useFavoriteStore();
  const { setPermanent } = useArcaconStore();

  // 모달 노출 및 1회 노출 여부 상태
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [pendingFavoriteId, setPendingFavoriteId] = useState(null);

  const modalShownOnceRef = useRef(false);

  const handleClickFavorite = (id, toggleOn) => {
    // 토글이 on이고, 모달을 아직 띄운 적이 없으면 모달 표시
    const _isFavorite = isFavorite(id);
    if (toggleOn && !modalShownOnceRef.current && _isFavorite) {
      setPendingFavoriteId(id);
      setShowFavoriteModal(true);
      modalShownOnceRef.current = true;
      return;
    }
    // 기존 동작
    if (isFavorite(id)) {
      removeFavoriteItem(id);
    } else {
      addFavoriteItem(id);
      setPermanent(id);
    }
  };

  // 모달에서 확인 클릭
  const handleModalConfirm = () => {
    setShowFavoriteModal(false);
    if (pendingFavoriteId) {
      // 토글이 on이었던 상황이므로 true 전달
      handleClickFavorite(pendingFavoriteId, true);
      setPendingFavoriteId(null);
    }
  };
  // 모달에서 취소 클릭
  const handleModalCancel = () => {
    setShowFavoriteModal(false);
    setPendingFavoriteId(null);
  };

  useEffect(() => {
    loadFavoriteItems();
  }, [loadFavoriteItems]);

  const toggleRef = useRef(toggle);
  useEffect(() => {
    toggleRef.current = toggle;
  }, [toggle]);

  const getToggleValue = (uid) => toggleRef.current[uid];

  const toggleFavorite = (uid) => {
    const current = getToggleValue(uid) || false;
    setToggle(uid, !current);
    modalShownOnceRef.current = false;
  };

  return (
    <>
      <FavoriteView
        pickers={pickers}
        getToggleValue={getToggle}
        toggleFavorite={toggleFavorite}
        showFavoriteModal={showFavoriteModal}
        onModalConfirm={handleModalConfirm}
        onModalCancel={handleModalCancel}
      />
      <FavoriteController
        pickers={pickers}
        getToggleValue={getToggleValue}
        onClickFavorite={(id, toggleOn) => handleClickFavorite(id, toggleOn)}
      />
    </>
  );
}
