// @ts-ignore
import { SetupContext } from '@vue/runtime-core'
import { onMounted } from '@nuxtjs/composition-api'
// import { waveRecord } from '~/utils/wave'

// let canvasRef: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let width: number
let height: number
// TODO =====================================================
/**
 * 设置 canvas DOM 元素宽高属性，因其初始宽高为(300, 150)
 * 后续绘制若坐标点超出此范围，会看不到绘制效果
 * */
// canvasRef.width = width
// canvasRef.height = height
// TODO =====================================================
let step = 0

// function drawAnimation () {
//   // const width = document.documentElement.clientWidth || document.body.clientWidth
//   // let height = document.documentElement.clientHeight || document.body.clientHeight
//   // height = height - 70 - 40 // 除去 Header + Footer 的高度
//   // const width = canvasRef.width
//   // const rect: DOMRect = canvasRef.getBoundingClientRect()
//   // const width: number = rect.width
//   // const height: number = rect.height
//   ctx.clearRect(0, 0, width, height)
//   ctx.save()
//   ctx.fillStyle = 'rgba(0, 222, 255, 0.2)'
//   ctx.beginPath()
//   ctx.moveTo(0, height / 2)
//   ctx.lineTo(width, height / 2)
//   ctx.lineTo(width, height)
//   ctx.lineTo(0, height)
//   ctx.closePath()
//   ctx.fill()
//   ctx.restore()
// }

const colors = ['rgba(0, 222, 255, 0.2)', 'rgba(157, 192, 249, 0.2)', 'rgba(0, 168, 255, 0.2)']

/**
 * canvas 尝试绘制波浪效果
 * */
function loop () {
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  // ctx.fillStyle = 'rgba(0, 222, 255, 0.2)'
  // 角度 +1
  step = (step + 1) % 360
  colors.forEach((color, index) => {
    ctx.fillStyle = color
    const angle = (step + index * 45) * Math.PI / 180
    // 矩形高度变化量
    const deltaHeight = Math.sin(angle) * 50 // 波峰：-50px ~ 50px
    const deltaHeightRight = Math.cos(angle) * 50
    ctx.beginPath()
    ctx.moveTo(0, height * 4 / 5 + deltaHeight)
    // 绘制 贝塞尔曲线 (cp1x, cp1y, cp2x, cp2y, endX, endY); cp: controlPoint
    // 左侧波纹
    ctx.bezierCurveTo(
      0, height * 4 / 5 + deltaHeight,
      width / 4, height * 4 / 5 + deltaHeightRight - 50,
      width / 2, height * 4 / 5 + deltaHeightRight
    )
    // 右侧波纹
    ctx.bezierCurveTo(
      width / 2, height * 4 / 5 + deltaHeightRight,
      width * 3 / 4, height * 4 / 5 + deltaHeightRight + 50,
      width, height * 4 / 5 + deltaHeightRight
    )
    // ctx.lineTo(width, height / 2 + deltaHeightRight)
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fill()
  })
  ctx.restore()
  window.requestAnimationFrame(loop)
}

export default function useArticle (context: SetupContext) {
  // 页面挂载完毕 => 绘制
  onMounted(() => {
    // canvasRef = context.refs.animateCanvas
    // ctx = canvasRef.getContext('2d')!
    // const rect: DOMRect = canvasRef.getBoundingClientRect()
    // width = rect.width
    // height = rect.height
    // /**
    //  * 设置 canvas DOM 元素宽高属性，因其初始宽高为(300, 150)
    //  * 后续绘制若坐标点超出此范围，会看不到绘制效果
    //  * */
    // canvasRef.width = width
    // canvasRef.height = height
    // loop()
    // waveRecord(canvasRef)
  })
  return {}
}
