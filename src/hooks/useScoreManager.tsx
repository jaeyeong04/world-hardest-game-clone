import { useState } from "react";
import { GameState } from "../constants/enum";

export default function useScoreManager() {
  const [score, setScore] = useState(0);
  const increaseScore = () => {
    setScore((prevScore) => prevScore + 10); // 점수를 10점씩 증가
  };
  const resetScore = () => {
    setScore(0);
  };
  return { score, increaseScore, resetScore };
}
