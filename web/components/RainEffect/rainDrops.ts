import createCanvas from './createCanvas'
import {chance, random, callFuncTimes} from './util'
import {ISource} from './types'

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

/**
 * 雨滴类
 * */
class RainDrops {
  constructor(
    protected width: number,
    protected height: number,
    protected scale: number,
    protected dropAlpha: ISource,
    protected dropColor: ISource,
    protected options: IOptions = {}
  ) {
    this.options = {...defaultOptions, ...options}
    this.init()
  }

  // 2d context
  canvas: null | HTMLCanvasElement = null
  ctx: null | CanvasRenderingContext2D = null
  // 飞沫 2d context
  droplets: null | HTMLCanvasElement = null
  dropletsCtx: null | CanvasRenderingContext2D = null
  // 飞沫像素密度
  dropletsPixelDensity = 1
  // 水滴
  drops: any[] = []

  dropsGfx: HTMLCanvasElement[] = []
  clearDropletsGfx: HTMLCanvasElement | null = null

  lastRender: number | null = null // 上次渲染时间戳
  textureCleaningIterations: number = 0 // 迭代清理纹理次数 ？
  // 飞沫数量
  dropletsCounter = 0

  /**
   * 大小半径差
   * */
  get deltaR() {
    return this.options.maxR - this.options.minR
  }

  /**
   * 雨滴面积
   * */
  get area() {
    return (this.width * this.height) / this.scale
  }

  /**
   * 雨滴面积乘数 ？
   * */
  get areaMultiplier() {
    return Math.sqrt(this.area / (1024 * 768))
  }

  init() {
    // create & save canvas DOM
    this.canvas = createCanvas(this.width, this.height)
    this.ctx = this.canvas.getContext('2d')!

    this.droplets = createCanvas(this.width * this.dropletsPixelDensity, this.height * this.dropletsPixelDensity)
    this.dropletsCtx = this.droplets.getContext('2d')!
    this.renderDropsGfx()
  }

  // 渲染坠落的 xx
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

  // 绘制雨滴
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

  // 绘制飞沫
  drawDroplet(x: number, y: number, r: number) {
    this.drawDrop(this.dropletsCtx!, Object.assign(Object.create(Drop), {
      x: x * this.dropletsPixelDensity,
      y: y * this.dropletsPixelDensity,
      r: r * this.dropletsPixelDensity
    }));
  }

  // 清除飞沫
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

  clearCanvas() {
    this.ctx!.clearRect(0, 0, this.width, this.height)
  }

  // 创建水滴
  createDrop(options = {}) {
    if (this.drops.length >= this.options.maxDrops * this.areaMultiplier) {
      return null
    }
    return {...Object.create(Drop), ...options}
  }

  // 将水滴添加至 drops
  addDrop(drop: any): boolean {
    if (this.drops.length >= this.options.maxDrops * this.areaMultiplier || drop === null) {
      return false
    }
    this.drops.push(drop)
    return true
  }

  // rain 状态更新
  updateRain(timeScale: number) {
    const rainDrops = []
    if (this.options.raining) {
      const limit = this.options.rainLimit * timeScale * this.areaMultiplier
      let count = 0
      while (chance(this.options.rainChance * timeScale * this.areaMultiplier) && count < limit) {
        count++
        const r = random(this.options.minR, this.options.maxR, (n: number) => {
          return n ** 3
        })
        const rainDrop = this.createDrop({
          x: random(this.width / this.scale),
          y: random((this.height / this.scale) * this.options.spawnArea[0], (this.height / this.scale) * this.options.spawnArea[1]),
          r: r,
          momentum: 1 + ((r - this.options.minR) * 0.1) + random(2),
          spreadX: 1.5,
          spreadY: 1.5
        })

        if (rainDrop !== null) {
          rainDrops.push(rainDrop)
        }
      }
    }
    return rainDrops
  }

  // 清除水滴
  clearDrops() {
    this.drops.forEach(drop => {
      setTimeout(() => {
        drop.shrink = 0.1 + random(0.5)
      }, random(1200))
    })
    this.clearTexture()
  }

  // 清除纹理
  clearTexture() {
    this.textureCleaningIterations = 50
  }

  update() {
    this.clearCanvas()

    const now = Date.now()
    if (this.lastRender === null) {
      this.lastRender = now
    }
    const deltaT = now - this.lastRender
    let timeScale = deltaT / (1000 / 60)
    if (timeScale >= 1.1) {
      timeScale = 1.1
    }
    timeScale *= this.options.globalTimeScale
    // 更新渲染时间点
    this.lastRender = now

    this.updateDrops(timeScale)
    window.requestAnimationFrame(this.update.bind(this))
  }

  updateDrops(timeScale: number) {
    let newDrops: any[] = []
    this.updateDroplets(timeScale)
    let rainDrops = this.updateRain(timeScale)
    newDrops = newDrops.concat(rainDrops)

    this.drops.sort((a, b) => {
      const va = a.y * (this.width / this.scale) + a.x
      const vb = b.y * (this.width / this.scale) + b.x
      return va > vb ? 0 : -1
    })

    this.drops.forEach((drop, i) => {
      if (!drop.killed) {
        // update gravity (重力)
        // chance of drops "creeping down" (顺着玻璃流下来)
        if (
          chance(drop.r - (this.options.minR * this.options.dropFallMultiplier) * (0.1 / this.deltaR) * timeScale)
        ) {
          drop.momentum += random((drop.r / this.options.maxR) * 4)
        }

        if (this.options.autoShink && drop.r <= this.options.minR && chance(0.05 * timeScale)) {
          drop.shrink += 0.01
        }

        drop.r -= drop.shrink * timeScale
        if (drop.r <= 0) drop.killed = true

        // 更新雨滴流过的路径轨迹
        if (this.options.raining) {
          drop.lastSpawn += drop.momentum * timeScale * this.options.trailRate
          if (drop.lastSpawn > drop.nextSpawn) {
            const trailDrop = this.createDrop({
              x: drop.x + (random(-drop.r, drop.r) * 0.1),
              y: drop.y - (drop.r * 0.1),
              r: drop.r * random(...this.options.trailScaleRange),
              spreadY: drop.momentum * 0.1,
              parent: drop
            })

            if (trailDrop !== null) {
              newDrops.push(trailDrop)

              drop.r *= 0.97 ** timeScale // Math.pow(0.97, timeScale)
              drop.lastSpawn = 0
              drop.nextSpawn = random(this.options.minR, this.options.maxR) - (drop.momentum * 2 * this.options.trailRate) + (this.options.maxR - drop.r)
            }
          }
        }

        // normalize spread
        drop.spreadX *= (0.4 ** timeScale)
        drop.spreadY *= (0.7 ** timeScale)

        const moved = drop.momentum > 0
        if (moved && drop.killed) {
          drop.y += drop.momentum * this.options.globalTimeScale
          drop.x += drop.momentumX * this.options.globalTimeScale
          if (drop.y > (this.height / this.scale) + drop.r) {
            drop.killed = true
          }
        }

        // collision 雨滴碰撞
        let checkCollision = (moved || drop.isNew) && !drop.killed;
        drop.isNew = false;

        if (checkCollision) {
          this.drops.slice(i + 1, i + 70).forEach((drop2) => {
            //basic check
            if (
              drop !== drop2 &&
              drop.r > drop2.r &&
              drop.parent !== drop2 &&
              drop2.parent !== drop &&
              !drop2.killed
            ) {
              const dx = drop2.x - drop.x;
              const dy = drop2.y - drop.y;
              let d = Math.sqrt((dx * dx) + (dy * dy));
              //if it's within acceptable distance
              if (d < (drop.r + drop2.r) * (this.options.collisionRadius + (drop.momentum * this.options.collisionRadiusIncrease * timeScale))) {
                let pi = Math.PI;
                let r1 = drop.r;
                let r2 = drop2.r;
                let a1 = pi * (r1 * r1);
                let a2 = pi * (r2 * r2);
                let targetR = Math.sqrt((a1 + (a2 * 0.8)) / pi);
                if (targetR > this.options.maxR) {
                  targetR = this.options.maxR;
                }
                drop.r = targetR;
                drop.momentumX += dx * 0.1;
                drop.spreadX = 0;
                drop.spreadY = 0;
                drop2.killed = true;
                drop.momentum = Math.max(drop2.momentum, Math.min(40, drop.momentum + (targetR * this.options.collisionBoostMultiplier) + this.options.collisionBoost));
              }
            }
          });
        }

        //slowdown momentum
        drop.momentum -= Math.max(1, (this.options.minR * 0.5) - drop.momentum) * 0.1 * timeScale;
        if (drop.momentum < 0) drop.momentum = 0;
        drop.momentumX *= Math.pow(0.7, timeScale);


        if (!drop.killed) {
          newDrops.push(drop);
          if (moved && this.options.dropletsRate > 0) this.clearDroplets(drop.x, drop.y, drop.r * this.options.dropletsCleaningRadiusMultiplier);
          this.drawDrop(this.ctx!, drop);
        }
      }
    }, this)

    this.drops = newDrops
  }

  // 更新飞沫
  updateDroplets(timeScale: number) {
    // 迭代清理纹理
    if (this.textureCleaningIterations > 0) {
      this.textureCleaningIterations -= timeScale
      this.dropletsCtx!.globalCompositeOperation = 'destination-out'
      this.dropletsCtx!.fillStyle = `rgba(0, 0, 0, ${0.05 * timeScale})`
      this.dropletsCtx!.fillRect(0, 0, this.width * this.dropletsPixelDensity, this.height * this.dropletsPixelDensity)
    }
    // 正在下雨
    if (this.options.raining) {
      this.dropletsCounter += this.options.dropletsRate * timeScale * this.areaMultiplier
      callFuncTimes(this.dropletsCounter, () => {
        this.dropletsCounter--
        this.drawDroplet(
          random(this.width / this.scale),
          random(this.height / this.scale),
          // @ts-ignore TODO =====================================
          random(...this.options.dropletsSize, (n: number) => {
            return n * n;
          }))
        // @ts-ignore TODO =====================================
      })
    }

    // @ts-ignore TODO =====================================
    this.ctx!.drawImage(this.droplets, 0, 0, this.width, this.height)
  }
}

export default RainDrops
