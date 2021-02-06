/**
 * 随机数
 * */
export function random(
  from: number | null = null,
  to: number | null = null,
  interpolation: Function | null = null
) {
  if (from === null) {
    from = 0;
    to = 1;
  } else if (to === null) {
    to = from;
    from = 0;
  }
  const delta = to - from;

  if (interpolation === null) {
    interpolation = (n: number) => {
      return n;
    }
  }
  return from + (interpolation(Math.random()) * delta);
}

/**
 *
 * */
export function change(controlNum: number) {
  return random() <= controlNum
}

/**
 * 调用 times 次 function
 * */
export function callFuncTimes(times: number, fn: Function) {
  for (let i = 0; i < times; i++) {
    // @ts-ignore
    fn.call(this, i)
  }
}
