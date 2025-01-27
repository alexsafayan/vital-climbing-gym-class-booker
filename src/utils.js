export const delay = async (min, max) => {
  const delayTime = min + Math.random() * (max - min);
  await new Promise(resolve => setTimeout(resolve, delayTime));
};