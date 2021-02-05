/**
 * 创建 canvas 元素
 * */
export default function createCanvas (width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}
