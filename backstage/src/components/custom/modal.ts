export function parseWidth (param: string) {
  if (param.includes('%')) {
    return parseInt(param) + 'vw'
  } else {
    return param + 'px'
  }
}

export function parseHeight (param: string) {
  if (param.includes('%')) {
    return parseInt(param) + 'vh'
  } else {
    return param + 'px'
  }
}
