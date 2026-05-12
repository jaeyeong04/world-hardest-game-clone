//Unit 중에 variant가 PLAYER인 '말'의 움직임을 관리하는 custom hook
//event listener를 통해 방향키 입력을 감지하고, 해당 방향으로 '말'의 위치를 업데이트
import { useState, useEffect, useRef, useCallback } from "react";
import { MOVE_DISTANCE } from "../constants/constants";
import { GameState, KeyCode } from "../constants/enum";
import { MAP_BOUNDARY } from "../constants/constants";
import useGameLoop from "./useGameLoop";
import { Position } from "../constants/enum";

//TODO: pressedKeys를 state가 아닌 ref로 관리하도록 변경하기

export default function usePlayerMoves(playState: GameState) {
  //초기 위치 설정
  const initialPosition: Position = { x: 300, y: 300 };
  const [position, setPosition] = useState<Position>(initialPosition);
  const pressedKeys = useRef<Array<string>>([]); //key가 눌렸을 때 눌린 키를 pressedKeys에 추가
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const pressedKeyCode = event.key;
    pressedKeys.current = [...pressedKeys.current, pressedKeyCode];
  }, []);
  //key가 떼졌을 때 pressedKeys에서 해당 키를 제거
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const pressedKeyCode = event.key;
    pressedKeys.current = pressedKeys.current.filter(
      (key) => key !== pressedKeyCode,
    );
  }, []);
  useEffect(() => {
    //키보드 press 이벤트 리스너 등록 및 해제
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  //position을 set하는 코드
  //useCallback을 사용하여 의존성 배열에 있는 값이 변경될 때만 함수가 재생성되도록 함
  const handlePlayerMovement = useCallback(() => {
    //dominant key = 나중에 입력된 키
    //가로와 세로 방향에 각각 dominant key를 정해서, dominant key 방향으로만 움직이도록 구현
    //dominant key는 pressedKeys 중 가로/세로 방향에 해당하는 키 중 가장 마지막에 입력된 키 => 배열의 뒤쪽에 위치한 키
    const verticalMovementKeys = pressedKeys.current.filter(
      (key) => key === KeyCode.UP || key === KeyCode.DOWN,
    );
    const horizontalMovementKeys = pressedKeys.current.filter(
      (key) => key === KeyCode.LEFT || key === KeyCode.RIGHT,
    );
    const verticalDominantKey =
      verticalMovementKeys[verticalMovementKeys.length - 1];
    const horizontalDominantKey =
      horizontalMovementKeys[horizontalMovementKeys.length - 1];
    let newX = position.x;
    let newY = position.y;
    if (verticalDominantKey) {
      if (verticalDominantKey === KeyCode.UP) {
        newY = Math.max(0, newY - MOVE_DISTANCE);
      } else if (verticalDominantKey === KeyCode.DOWN) {
        newY = Math.min(MAP_BOUNDARY, newY + MOVE_DISTANCE);
      }
    }
    if (horizontalDominantKey) {
      if (horizontalDominantKey === KeyCode.LEFT) {
        newX = Math.max(0, newX - MOVE_DISTANCE);
      } else if (horizontalDominantKey === KeyCode.RIGHT) {
        newX = Math.min(MAP_BOUNDARY, newX + MOVE_DISTANCE);
      }
    }
    setPosition({ x: newX, y: newY });
  }, [pressedKeys, position]);
  //useGameLoop 훅을 사용해서 매 프레임마다 handlePlayerMovement 호출
  useGameLoop(handlePlayerMovement, playState);
  const resetPlayerPosition = useCallback(() => {
    setPosition(initialPosition);
  }, []);
  return { position, resetPlayerPosition };
}
