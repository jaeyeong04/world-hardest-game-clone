//Unit 중에 variant가 PLAYER인 '말'의 움직임을 관리하는 custom hook
//event listener를 통해 방향키 입력을 감지하고, 해당 방향으로 '말'의 위치를 업데이트
import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export default function usePlayerMoves() {
  //초기 위치 설정
  const initialPosition: Position = { x: 300, y: 300 };
  const [position, setPosition] = useState<Position>(initialPosition);
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setPosition((prevPosition) => {
        let newX = prevPosition.x;
        let newY = prevPosition.y;
        const step = 10;
        switch (event.key) {
          default:
            return prevPosition;
          case "ArrowUp":
            newY = Math.max(0, prevPosition.y - step);
            break;
          case "ArrowDown":
            newY = Math.min(580, prevPosition.y + step);
            break;
          case "ArrowLeft":
            newX = Math.max(0, prevPosition.x - step);
            break;
          case "ArrowRight":
            newX = Math.min(580, prevPosition.x + step);
            break;
        }
        const newPosition: Position = { x: newX, y: newY };
        return newPosition;
      });
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return position;
}
