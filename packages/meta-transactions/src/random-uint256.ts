export const generateRandomUint256 = (): string => {
  let randomUint256 = new Date().getTime().toString(); // 13 chars

  randomUint256 += Math.random().toString().slice(2); // 16 chars
  randomUint256 += Math.random().toString().slice(2); // 16 chars
  randomUint256 += Math.random().toString().slice(2); // 16 chars

  return randomUint256;
};
