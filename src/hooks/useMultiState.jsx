import { useState, useRef, useEffect, useCallback } from "react";

// uid별로 여러 개의 토글 상태를 관리하는 커스텀 훅
export default function useMultiState(initialState) {
  const [state, setState] = useState({});

  // 특정 uid의 토글 값을 반환
  const get = useCallback((key) => state[key] || initialState, [state, initialState]);

  // 특정 uid의 토글 값을 변경 (value에 함수도 허용)
  const set = useCallback((key, value) => {
    setState((prev) => {
      const newValue = typeof value === "function" ? value(prev[key]) : value;
      return { ...prev, [key]: newValue };
    });
  }, []);

  return { get, set, state };
}
