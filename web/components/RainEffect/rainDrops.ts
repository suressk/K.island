import createCanvas from './createCanvas'

let dropSize = 64
const Drop = {
  x: 0,
  y: 0,
  r: 0,
  spreadX: 0,
  spreadY: 0,
  momentum: 0,
  momentumX: 0,
  lastSpawn: 0,
  nextSpawn: 0,
  parent: null,
  isNew: true,
  killed: false,
  shrink: 0
}
// 默认配置
const defaultOptions = {
  minR: 10,
  maxR: 40,
  maxDrops: 900,
  rainChance: 0.3,
  rainLimit: 3,
  dropletsRate: 50,
  dropletsSize: [2, 4],
  dropletsCleaningRadiusMultiplier: 0.43,
  raining: true,
  globalTimeScale: 1,
  trailRate: 1,
  autoShrink: true,
  spawnArea: [-0.1, 0.95],
  trailScaleRange: [0.2, 0.5],
  collisionRadius: 0.65,
  collisionRadiusIncrease: 0.01,
  dropFallMultiplier: 1,
  collisionBoostMultiplier: 0.05,
  collisionBoost: 1
}

interface IOptions {
  [prop: string]: any;
}

class RainDrops {
  constructor(
    protected width: number,
    protected height: number,
    protected scale: number,
    protected dropAlpha: number,
    protected dropColor: string,
    protected options: IOptions = {}
  ) {
    this.options = {...defaultOptions, ...options}
    this.init()
  }

  canvas: null | HTMLCanvasElement = null
  ctx: null | CanvasRenderingContext2D = null
  // 水滴
  droplets: null | HTMLCanvasElement = null
  dropletsCtx: null | CanvasRenderingContext2D = null
  dropletsPixelDensity = 1
  drops = []
  dropsGfx: HTMLCanvasElement[] = []
  clearDropletsGfx: HTMLCanvasElement | null = null

  get deltaR() {
    return this.options.maxR - this.options.minR
  }

  get area() {
    return (this.width * this.height) / this.scale
  }

  get areaMultiplier() {
    return Math.sqrt(this.area / (1024 * 768))
  }

  init() {
    // create & save canvas DOM
    this.canvas = createCanvas(this.width, this.height)
    this.ctx = this.canvas.getContext('2d')

    this.droplets = createCanvas(this.width * this.dropletsPixelDensity, this.height * this.dropletsPixelDensity)
    this.dropletsCtx = this.droplets.getContext('2d')
    this.renderDropsGfx()
  }

  // 绘制坠落的 xx
  renderDropsGfx() {
    const dropBuffer = createCanvas(dropSize, dropSize)
    const dropBufferCtx = dropBuffer.getContext('2d')!
    this.dropsGfx = Array.apply(null, Array(255)).map((cur, i) => {
      const drop = createCanvas(dropSize, dropSize)
      const dropCtx = drop.getContext('2d')!
      dropBufferCtx.clearRect(0, 0, dropSize, dropSize)
      // color
      dropBufferCtx.globalCompositeOperation = 'source-over'
      // @ts-ignore TODO =====================================================
      dropBufferCtx.drawImage(this.dropColor, 0, 0, dropSize, dropSize)

      // blue overlay
      dropBufferCtx.globalCompositeOperation = 'screen'
      dropBufferCtx.fillStyle = `rgba(0, 0, ${i}, 1)`
      dropBufferCtx.fillRect(0, 0, dropSize, dropSize)

      // alpha
      dropCtx.globalCompositeOperation = 'source-over'
      // @ts-ignore TODO =====================================================
      dropCtx.drawImage(this.dropAlpha, 0, 0, dropSize, dropSize)

      dropCtx.globalCompositeOperation = "source-in";
      dropCtx.drawImage(dropBuffer, 0, 0, dropSize, dropSize);
      return drop;
    })

    this.clearDropletsGfx = createCanvas(128, 128)
    const clearDropletsCtx = this.clearDropletsGfx.getContext('2d')!
    clearDropletsCtx.fillStyle = '#000'
    clearDropletsCtx.beginPath()
    // 绘制一个圆心为 (64, 64) 半径为 64 像素的圆
    clearDropletsCtx.arc(64, 64, 64, 0, Math.PI * 2)
    clearDropletsCtx.fill()
  }

  // 绘制坠落雨滴
  drawDrop(ctx: CanvasRenderingContext2D, drop: any) {
    if (this.dropsGfx.length > 0) {
      let x = drop.x,
        y = drop.y,
        r = drop.r,
        spreadX = drop.spreadX,
        spreadY = drop.spreadY
      let scaleX = 1,
        scaleY = 1.5
      let d = Math.max(0, Math.min(1, ((r - this.options.minR) / (this.deltaR)) * 0.9))
      d *= 1 / (((drop.spreadX + drop.spreadY) / 2) + 1)

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      d = Math.floor(d * (this.dropsGfx.length - 1))
      ctx.drawImage(
        this.dropsGfx[d],
        (x - (r * scaleX * (spreadX + 1))) * this.scale,
        (y - (r * scaleY * (spreadY + 1))) * this.scale,
        (r * 2 * scaleX * (spreadX + 1)) * this.scale,
        (r * 2 * scaleY * (spreadY + 1)) * this.scale,
      )
    }
  }

  // 清除水滴
  clearDroplets(x: number, y: number, r = 30) {
    const ctx = this.dropletsCtx!
    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(
      this.clearDropletsGfx!,
      (x - r) * this.dropletsPixelDensity * this.scale,
      (y - r) * this.dropletsPixelDensity * this.scale,
      (r * 2) * this.dropletsPixelDensity * this.scale,
      (r * 2) * this.dropletsPixelDensity * this.scale * 1.5
    )
  }

  clearCanvas () {
    this.ctx!.clearRect(0, 0, this.width, this.height)
  }

  createDrop (options = {}) {
    if (this.drops.length >= this.options.maxDrops * this.areaMultiplier) {
      return null
    }
    return {
      ...Object.create(Drop),
      ...options
    }
  }
}

export default RainDrops
