import { useEffect, useRef, useState } from "react";
import { MAP_BOUNDARY } from "../constants/constants";
import { Position } from "../constants/enum";
import useGameLoop from "./useGameLoop";

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

//코인의 최대 개수
const MAX_COINS = 7;

//코인 생성 주기 (초 단위)
const COIN_SPAWN_INTERVAL = 7;

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
  onCoinCollected,
}: {
  time: number;
  playerPosition: Position;
  onCoinCollected: () => void;
}) {
  //코인의 위치를 저장하는 상태 - 코인은 여러 개가 존재할 수 있으므로 배열 형태로 관리
  const [coinPositions, setCoinPositions] =
    useState<Position[]>(initialCoinPositions);
  //현재 필드에 있는 코인 개수를 저장하는 ref
  const coinCountRef = useRef<number>(initialCoinPositions.length);
  useEffect(() => {
    // 플레이어가 코인 위에 있는지 확인
    const updatedCoinPositions = coinPositions.filter((coinPos) => {
      if (isPlayerOnCoin(playerPosition, coinPos)) {
        onCoinCollected(); // 코인이 수집되었을 때 점수 증가 함수 호출
      }
      return !isPlayerOnCoin(playerPosition, coinPos);
    });
    setCoinPositions(updatedCoinPositions);
    coinCountRef.current = updatedCoinPositions.length;
  }, [playerPosition]);
  //새로운 코인 2개를 랜덤한 위치에 생성하는 함수
  const addCoins = () => {
    const newCoins: Position[] = [];
    for (let i = 0; i < 2; i++) {
      const newCoinPosition: Position = {
        x: Math.random() * MAP_BOUNDARY,
        y: Math.random() * MAP_BOUNDARY,
      };
      newCoins.push(newCoinPosition);
    }
    setCoinPositions((prev) => [...prev, ...newCoins]);
    coinCountRef.current += 2;
  };
  //마지막으로 코인을 추가한 시간을 저장하는 reference - 일정 시간 간격으로 코인을 추가하기 위해 사용
  const lastCoinAddTimeRef = useRef<number>(time);
  //7초 간격으로 코인을 추가하는 함수 (단, 코인 개수에 제한이 있음)
  const checkAndSpawnCoins = () => {
    if (time - lastCoinAddTimeRef.current >= COIN_SPAWN_INTERVAL) {
      if (coinCountRef.current < MAX_COINS) {
        addCoins();
        lastCoinAddTimeRef.current = time;
      }
    }
    //추가로 코인이 2개 이하로 남으면 즉시 2개 추가
    if (coinCountRef.current <= 2) {
      addCoins();
    }
  };
  useGameLoop(checkAndSpawnCoins);
  return coinPositions;
}
