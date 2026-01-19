import RecentController from "./controller";
import RecentView from "./view";

/*
  [최근 사용한 아카콘 모듈]
  - 사용자가 최근에 사용한 아카콘을 저장 및 다시 사용할 수 있도록 지원
  - 기존 최근 사용 아카콘은 비활성화
*/
export default function RecentModule() {
  return (
    <>
      <RecentView />
      <RecentController />
    </>
  );
}
