import RainDrops from "./rainDrops";

let rainDrops,
  canvasDom: HTMLCanvasElement,
  renderer,
  dropAlpha: number = 1,
  dropColor: string = ''

function init() {
  // @ts-ignore
  canvasDom = document.getElementById('coverContainer')!
  let dpi: number = window.devicePixelRatio
  canvasDom.width = window.innerWidth * dpi
  canvasDom.height = window.innerHeight * dpi
  canvasDom.style.width = window.innerWidth * dpi + 'px'
  canvasDom.style.height = window.innerHeight * dpi + 'px'
  rainDrops = new RainDrops(
    canvasDom.width,
    canvasDom.height,
    dpi,
    dropAlpha,
    dropColor,
    {
      trailRate: 1,
      trailScaleRange: [0.2, 0.45],
      collisionRadius: 0.45,
      dropletsCleaningRadiusMultiplier: 0.28
    }
  )
}
