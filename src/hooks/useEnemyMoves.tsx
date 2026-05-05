import { useRef, useState } from "react";
import { Position } from "../constants/enum";
import {
  ENEMY_SPEED_SCALE,
  MAP_BOUNDARY,
  MOVE_DISTANCE,
} from "../constants/constants";
import useGameLoop from "./useGameLoop";
import { getRandomValue } from "../utils/utils";

//적 추가하는 시간 주기
const ENEMY_SPAWN_INTERVAL = 5;

/**
 * 적의 움직임을 관리하는 커스텀 훅
 * - 적의 위치를 상태로 관리하여 게임 보드에서 적의 움직임을 구현하는 데 사용
 * @returns enemyPositionArray: 모든 적의 위치를 저장하는 배열 (각 적의 위치는 x, y 좌표를 포함하는 객체 형태)
 */

export default function useEnemyMoves(time: number) {
  //맵의 테두리에서 적이 시작하도록 초기 위치 설정 - 예시로 4마리의 적을 맵의 각 모서리에 배치
  //리렌더링 시 불필요한 재생성을 방지하기 위해 useRef를 사용하여 초기 위치를 저장
  const initialEnemyPositions = useRef<Position[]>([
    { x: 0, y: 0 }, // 왼쪽 상단
    { x: MAP_BOUNDARY, y: 0 }, // 오른쪽 상단
    { x: 0, y: MAP_BOUNDARY }, // 왼쪽 하단
    { x: MAP_BOUNDARY, y: MAP_BOUNDARY }, // 오른쪽 하단
  ]);
  //적의 위치를 저장하는 상태 - 적은 여러 마리가 존재할 수 있으므로 배열 형태로 관리
  const [enemyPositionArray, setEnemyPositionArray] = useState<Position[]>(
    initialEnemyPositions.current,
  );
  //enemyPositionArray의 { dx, dy }를 저장하는 reference
  const enemyMovementRef = useRef<{ dx: number; dy: number }[]>(
    initialEnemyPositions.current.map(() => ({
      dx: getRandomValue() * ENEMY_SPEED_SCALE * MOVE_DISTANCE,
      dy: getRandomValue() * ENEMY_SPEED_SCALE * MOVE_DISTANCE,
    })),
  );
  //적을 추가하는 함수 - 게임이 진행됨에 따라 새로운 적을 추가할 수 있도록 구현
  const addEnemy = () => {
    //적이 추가되는 위치는 initialEnemyPositions에서 랜덤하게 선택
    const newEnemyPositionIndex = Math.floor(
      Math.random() * initialEnemyPositions.current.length,
    );
    const newEnemyPosition =
      initialEnemyPositions.current[newEnemyPositionIndex];
    setEnemyPositionArray((prevPositions) => [
      ...prevPositions,
      newEnemyPosition,
    ]);
    enemyMovementRef.current.push({
      dx: getRandomValue() * ENEMY_SPEED_SCALE * MOVE_DISTANCE,
      dy: getRandomValue() * ENEMY_SPEED_SCALE * MOVE_DISTANCE,
    });
  };
  //마지막으로 적을 추가한 시간을 저장하는 reference - 일정 시간 간격으로 적을 추가하기 위해 사용
  const lastEnemyAddTimeRef = useRef<number>(time);
  //5초 간격으로 적을 추가하는 함수
  const checkAndSpawnEnemy = () => {
    if (time - lastEnemyAddTimeRef.current >= ENEMY_SPAWN_INTERVAL) {
      addEnemy();
      lastEnemyAddTimeRef.current = time;
    }
  };
  //적의 위치를 주기적으로 업데이트하는 함수 - useGameLoop을 사용하여 일정 간격으로 호출
  const moveEnemies = () => {
    setEnemyPositionArray((prevPositions) =>
      prevPositions.map((pos, index) => {
        const { dx, dy } = enemyMovementRef.current[index];
        const newX = pos.x + dx;
        const newY = pos.y + dy;
        //맵의 경계를 벗어나지 않도록 처리
        if (newX < 0 || newX > MAP_BOUNDARY) {
          enemyMovementRef.current[index].dx *= -1; // x 방향 이동 반전
        }
        if (newY < 0 || newY > MAP_BOUNDARY) {
          enemyMovementRef.current[index].dy *= -1; // y 방향 이동 반전
        }
        return { x: newX, y: newY };
      }),
    );
  };
  useGameLoop(() => {
    moveEnemies();
    checkAndSpawnEnemy();
  }); // 1초마다 적의 위치 업데이트
  return enemyPositionArray;
}
