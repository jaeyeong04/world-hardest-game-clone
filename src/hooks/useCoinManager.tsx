import { useEffect, useState } from "react";
import { MAP_BOUNDARY } from "../constants/constants";
import { Position } from "../constants/enum";

//코인의 초기 위치 (초기에는 4개)
const DISTANCE_FROM_WALL = 100;

const initialCoinPositions: Position[] = [
  {
    x: DISTANCE_FROM_WALL,
    y: DISTANCE_FROM_WALL,
  },
  {
    x: MAP_BOUNDARY - DISTANCE_FROM_WALL,
    y: DISTANCE_FROM_WALL,
  },
  {
    x: DISTANCE_FROM_WALL,
    y: MAP_BOUNDARY - DISTANCE_FROM_WALL,
  },
  {
    x: MAP_BOUNDARY - DISTANCE_FROM_WALL,
    y: MAP_BOUNDARY - DISTANCE_FROM_WALL,
  },
];

//코인과 플레이어의 Position이 일치하는지 확인하는 함수
/**
 * @argument playerPosition: 플레이어의 현재 위치 (x, y 좌표를 포함하는 객체 형태)
 * @argument coinPosition: 코인의 위치 (x, y 좌표를 포함하는 객체 형태)
 * 오차 범위 허용: 20px
 * @returns boolean: 플레이어와 코인의 위치가 일치하면 true, 그렇지 않으면 false
 */
const ALLOWED_ERROR = 20; // 허용 오차 범위 (20px)
const isPlayerOnCoin = (playerPosition: Position, coinPosition: Position) => {
  return (
    Math.abs(playerPosition.x - coinPosition.x) < ALLOWED_ERROR &&
    Math.abs(playerPosition.y - coinPosition.y) < ALLOWED_ERROR
  );
};

/**
 * @argument time: 게임이 시작된 후 경과된 시간 (초 단위)
 * @argument playerPosition: 플레이어의 현재 위치 (x, y 좌표를 포함하는 객체 형태)
 * @returns coinPositions: 모든 코인의 위치를 저장하는 배열 (각 코인의 위치는 x, y 좌표를 포함하는 객체 형태)
 */

export default function useCoinManager({
  time,
  playerPosition,
}: {
  time: number;
  playerPosition: Position;
}) {
  const [coinPositions, setCoinPositions] =
    useState<Position[]>(initialCoinPositions);
  useEffect(() => {
    // 플레이어가 코인 위에 있는지 확인
    const updatedCoinPositions = coinPositions.filter(
      (coinPos) => !isPlayerOnCoin(playerPosition, coinPos),
    );
    setCoinPositions(updatedCoinPositions);
  }, [playerPosition]);
  return coinPositions;
}
