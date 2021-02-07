import * as WebGL from './webgl'
import {ISource} from "./types";

class GL {
  constructor(
    protected canvasDom: HTMLCanvasElement,
    protected options = {},
    protected vert: string,
    protected frag: string
  ) {
    this.init()
  }

  gl: WebGL2RenderingContext | null = null
  width: number = 0
  height: number = 0
  program: WebGLProgram | null = null

  init() {
    this.width = this.canvasDom.width
    this.height = this.canvasDom.height
    this.gl = WebGL.getContext(this.canvasDom)!
    this.program = this.createProgram(this.vert, this.frag)
    this.useProgram(this.program!)
  }

  // 创建程序
  createProgram(vert: string, frag: string) {
    return WebGL.createProgram(this.gl!, vert, frag)
  }

  useProgram(program: WebGLProgram) {
    this.program = program
    this.gl!.useProgram(program)
  }

  // 创建纹理
  createTexture(source: ISource, i: number) {
    return WebGL.createTexture(this.gl!, source, i);
  }

  createUniform(type: string, name: string, ...v: any[]) {
    WebGL.createUniform(this.gl!, this.program!, type, name, ...v);
  }

  activeTexture(i: number) {
    WebGL.activeTexture(this.gl!, i);
  }

  updateTexture(source: ISource) {
    WebGL.updateTexture(this.gl!, source);
  }

  draw() {
    WebGL.setRectangle(this.gl!, -1, -1, 2, 2);
    this.gl!.drawArrays(this.gl!.TRIANGLES, 0, 6);
  }
}

export default GL
