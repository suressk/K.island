import RainDrops from './RainDrops'
import loadImages from './ImageLoader'
import { ISource } from './types'

let rainDrops,
  canvasDom: HTMLCanvasElement,
  renderer,
  dropAlpha: ISource,
  dropColor: ISource

function loadTextures() {
  loadImages([
    { name: 'dropAlpha', src: '~/static/images/drop-alpha.png' },
    { name: 'dropColor', src: '~/static/images/drop-color.png' }
  ]).then(images => {
    // @ts-ignore
    dropColor = images.dropColor.img
    // @ts-ignore
    dropAlpha = images.dropAlpha.img
    init()
  })
}

loadTextures()

function init() {
  canvasDom = document.getElementById('coverContainer') as HTMLCanvasElement
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
