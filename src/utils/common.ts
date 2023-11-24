// 睡眠等待
export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
