import { useEffect, useRef } from "react";

/**
 * 게임 루프를 관리하는 커스텀 훅
 * useRef와 requestAnimationFrame을 사용하여 게임 루프를 구현합니다.
 * @param callback 매 프레임마다 호출되는 콜백 함수
 * @returns void
 */

export default function useGameLoop(callback: () => void) {
  const requestRef = useRef<number>(0);
  const animate = () => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);
}
