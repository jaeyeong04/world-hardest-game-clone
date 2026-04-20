import { useCallback, useRef, useState } from "react";
import useGameLoop from "./useGameLoop";

/**
 * 게임 타이머 훅
 * 게임이 시작된 후 경과된 시간을 초 단위로 반환하는 훅입니다.
 * @returns time - 게임 진행된 시간 (in seconds)
 */

export default function useTimer() {
  const [time, setTime] = useState<number>(0);
  //time이 0부터 시작하여 1초마다 1씩 증가하도록 구현
  const lastTimeRef = useRef<number>(performance.now());
  const timeIncrease = useCallback(() => {
    const now = performance.now();
    const deltaTime = (now - lastTimeRef.current) / 1000;
    lastTimeRef.current = now;
    setTime((prevTime) => prevTime + deltaTime);
  }, []);
  useGameLoop(timeIncrease);
  return time;
}
