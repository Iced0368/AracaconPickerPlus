# ArcaconPickerPlus

이 프로젝트는 아카라이브(https://arca.live/b)의 아카콘(Arcacon) 관련 기능을 제공하는 Tampermonkey 확장 프로그램입니다. Vite와 React를 기반으로 개발되었습니다.

## 설치

https://greasyfork.org/ko/scripts/563084-%EC%95%84%EC%B9%B4%EC%BD%98-%ED%94%BD%EC%BB%A4-%ED%94%8C%EB%9F%AC%EC%8A%A4-arcacon-picker-plus

## 주요 기능

- 아카콘 즐겨찾기 관리
- 메모 기능
- 검색 기능
- 썸네일 오버레이 등 유틸리티 제공

## 폴더 구조

- `src/`
  - `core/` : 핵심 상수 및 프래그먼트
  - `hooks/` : 커스텀 훅
  - `modules/` : 주요 기능별 모듈 (favorite, memo, search 등)
  - `stores/` : 상태 관리
  - `utils/` : 유틸리티 함수 및 컴포넌트
