import GL from "~/components/RainEffect/GL";

const requireShaderScript = require('glslify')

const vertShader = requireShaderScript('./shaders/simple.vert')
const fragShader = requireShaderScript('./shaders/water.frag')

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

  init() {
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.gl = new GL(this.canvas, { alpha:false }, vertShader, fragShader)
    const gl = this.gl!
    this.programWater = gl.program

    gl.createUniform('2f', 'resolution', this.width, this.height)
  }
}

export default RainRenderer
