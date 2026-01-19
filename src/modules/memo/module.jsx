import { useState, useCallback } from "react";
import { useArcaconStore, useMemoStore } from "../../stores";

import MemoController from "./controller";
import MemoView from "./view";
/*
  [메모 모듈]
  - 메모 기능을 추가
  - 메모된 아카콘 오버레이 표시
*/

export default function MemoModule() {
  const { getMemoById, setMemoItem, deleteMemoItem } = useMemoStore();
  const { setPermanent } = useArcaconStore();
  const [currentMemoId, setCurrentMemoId] = useState(null);
  const [memoVisible, setMemoVisible] = useState(false);

  // 메모 열기 (id 지정)
  const openMemo = useCallback(
    (id) => {
      const memo = getMemoById(id);
      setCurrentMemoId(id);
      setMemoVisible(true);
    },
    [getMemoById],
  );

  // 메모 닫기
  const closeMemo = useCallback(() => {
    setCurrentMemoId(null);
    setMemoVisible(false);
  }, []);

  // 메모 저장
  const saveMemo = useCallback((id, text) => {
    if (!text) {
      deleteMemoItem(id);
      return;
    }
    setMemoItem(id, text);
    setPermanent(id);
  }, []);

  return (
    <>
      <MemoView
        memoVisible={memoVisible}
        currentMemoId={currentMemoId}
        openMemo={openMemo}
        closeMemo={closeMemo}
        saveMemo={saveMemo}
        removeMemo={deleteMemoItem}
      />
      <MemoController openMemo={openMemo} />
    </>
  );
}
