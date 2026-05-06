import { useState } from "react";

export default function useScoreManager() {
  const [score, setScore] = useState(0);
  const increaseScore = () => {
    setScore((prevScore) => prevScore + 10); // 점수를 10점씩 증가
  };
  return { score, increaseScore };
}
