import { useState, useCallback } from "react";
import { useElementStore } from "../../stores";
import MemoController from "./controller";
import MemoView from "./view";
import useMemoStore from "../../stores/memo";

export default function MemoModule() {
  const pickers = useElementStore((state) => state.pickers);

  const { getMemoById, setMemoItem, deleteMemoItem } = useMemoStore();
  const [currentMemo, setCurrentMemo] = useState(null);
  const [memoVisible, setMemoVisible] = useState(false);

  // 메모 열기 (id 지정)
  const openMemo = useCallback(
    (arcacon) => {
      const memo = getMemoById(arcacon.id);
      setCurrentMemo({ ...arcacon, text: memo?.text || "" });
      setMemoVisible(true);
    },
    [getMemoById],
  );

  // 메모 닫기
  const closeMemo = useCallback(() => {
    setCurrentMemo(null);
    setMemoVisible(false);
  }, []);

  // 메모 저장
  const saveMemo = useCallback((arcacon, text) => {
    if (!text) {
      deleteMemoItem(arcacon.id);
      return;
    }
    setMemoItem(arcacon, text);
  }, []);

  return (
    <>
      <MemoView
        memoVisible={memoVisible}
        currentMemo={currentMemo}
        openMemo={openMemo}
        closeMemo={closeMemo}
        saveMemo={saveMemo}
        removeMemo={deleteMemoItem}
      />
      <MemoController pickers={pickers} openMemo={openMemo} />
    </>
  );
}
