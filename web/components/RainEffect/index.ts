import RainDrops from './RainDrops'
import RainRenderer from './RainRenderer'

import loadImages from './ImageLoader'
import { ISource } from './types'

let rainDrops,
  canvasDom: HTMLCanvasElement,
  renderer,
  dropAlpha: ISource,
  dropColor: ISource

export default function loadTextures() {
  loadImages([
    { name: 'dropAlpha', src: require('~/static/images/drop-alpha.png') },
    { name: 'dropColor', src: require('~/static/images/drop-color.png') }
  ]).then(images => {
    // @ts-ignore imageDom
    dropColor = images.dropColor.img
    // @ts-ignore
    dropAlpha = images.dropAlpha.img
    init()
  })
}

// loadTextures()

function init() {
  canvasDom = document.getElementById('coverContainer') as HTMLCanvasElement
  // 确定应添加多少额外的像素密度以使图像更清晰
  const dpi: number = window.devicePixelRatio
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

  // renderer = new RainRenderer(
  //  canvasDom,
  //  rainDrops.canvas,
  //  null,
  //  {
  //    brightness:1.04,
  //    alphaMultiply:6,
  //    alphaSubtract:3,
  //  }
  // )
  renderer = new RainRenderer(canvasDom, rainDrops.canvas!, null, {
    brightness:1.04,
    alphaMultiply:6,
    alphaSubtract:3
  })
  // setupEvents()
}

// function setupEvents() {
//
// }
