import { useRef, useState } from "react";
import { Position } from "../constants/enum";
import { MAP_BOUNDARY, MOVE_DISTANCE } from "../constants/constants";
import useGameLoop from "./useGameLoop";

/**
 * 적의 움직임을 관리하는 커스텀 훅
 * - 적의 위치를 상태로 관리하여 게임 보드에서 적의 움직임을 구현하는 데 사용
 * @returns enemyPositionArray: 모든 적의 위치를 저장하는 배열 (각 적의 위치는 x, y 좌표를 포함하는 객체 형태)
 */

export default function useEnemyMoves() {
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
  const enemyMovementRef = useRef<{ dx: number; dy: number }[]>([
    {
      dx: Math.random() * 3 * MOVE_DISTANCE,
      dy: Math.random() * 3 * MOVE_DISTANCE,
    },
    {
      dx: -Math.random() * 3 * MOVE_DISTANCE,
      dy: Math.random() * 3 * MOVE_DISTANCE,
    },
    {
      dx: Math.random() * 3 * MOVE_DISTANCE,
      dy: -Math.random() * 3 * MOVE_DISTANCE,
    },
    {
      dx: -Math.random() * 3 * MOVE_DISTANCE,
      dy: -Math.random() * 3 * MOVE_DISTANCE,
    },
  ]);
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
  useGameLoop(moveEnemies); // 1초마다 적의 위치 업데이트
  return enemyPositionArray;
}
