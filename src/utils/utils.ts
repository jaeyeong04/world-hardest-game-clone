//-1 ~ 1 사이의 랜덤한 수를 반환하는 util 함수
const getRandomValue = () => {
  return Math.random() * 2 - 1;
};

export { getRandomValue };
