import GL from '~/components/RainEffect/GL';
// @ts-ignore
import requireShaderScript from 'glslify'
import simpleVert from './shaders/simple'
import waterFrag from './shaders/water'

const vertShader = requireShaderScript(simpleVert)
const fragShader = requireShaderScript(waterFrag)

// console.log(vertShader)
// console.log(fragShader)

const defaultOptions = {
  renderShadow: false,
  minRefraction: 256,
  maxRefraction: 512,
  alphaMultiply: 20,
  alphaSubtract: 5,
  parallaxBg: 5,
  parallaxFg: 20
}

class RainRenderer {
  private options: {
    renderShadow: boolean;
    parallaxBg: number;
    alphaSubtract: number;
    parallaxFg: number;
    minRefraction: number;
    maxRefraction: number;
    alphaMultiply: number;
  }
  constructor(
    protected canvas: HTMLCanvasElement,
    protected canvasLiquid: HTMLCanvasElement,
    protected imageShine = null,
    options = {}
  ) {
    this.options = { ...defaultOptions, ...options }
    this.init()
  }

  width: number = 0;
  height: number = 0;
  gl: GL | null = null;
  programWater: WebGLProgram | null = null;
  textures: any[] = [];
  imageFg: any = null;
  imageBg: any = null;
  parallaxX: number = 0;
  parallaxY: number = 0;

  init() {
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.gl = new GL(this.canvas, { alpha: false }, vertShader, fragShader)
    const gl = this.gl
    this.programWater = gl.program

    gl.createUniform('2f', 'resolution', this.width, this.height)
    // gl.createUniform('1i', 'renderShine', this.imageShine == null ? false : true);
    gl.createUniform('1i', 'renderShadow', this.options.renderShadow);
    gl.createUniform('1f', 'minRefraction', this.options.minRefraction);
    gl.createUniform('1f', 'refractionDelta', this.options.maxRefraction - this.options.minRefraction);
    gl.createUniform('1f', 'alphaMultiply', this.options.alphaMultiply);
    gl.createUniform('1f', 'alphaSubtract', this.options.alphaSubtract);
    gl.createUniform('1f', 'parallaxBg', this.options.parallaxBg);
    gl.createUniform('1f', 'parallaxFg', this.options.parallaxFg);

    gl.createTexture(null, 0)

    this.textures = [
      { name: 'textureFg', img: this.imageFg },
      { name: 'textureBg', img: this.imageBg }
    ]

    this.textures.forEach((texture, i) => {
      gl.createTexture(texture.img, i + 1)
      gl.createUniform('1i', texture.name, i + 1)
    })
    this.draw()
  }

  draw() {
    this.gl?.useProgram(this.programWater!)
    this.gl?.createUniform('2f', 'parallax', this.parallaxX, this.parallaxY)
    this.updateTexture()
    this.gl?.draw()

    window.requestAnimationFrame(this.draw.bind(this))
  }

  updateTexture() {
    this.gl?.activeTexture(0)
    this.gl?.updateTexture(this.canvasLiquid)
  }
}

export default RainRenderer
