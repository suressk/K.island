const requireShaderScript = require('glslify')

const vertShader = requireShaderScript('./shaders/simple.vert')
const fragShader = requireShaderScript('./shaders/water.frag')

const defaultOptions = {
  renderShadow: false,
  minRefraction: 256,
  maxRefraction: 512,
  alphaMultiply: 20,
  alphaSubtract: 5,
  parallaxBg: 5,
  parallaxFg: 20
}

class ReinRenderer {
  // constructor(
  //   canvas,
  //   canvasLiquid,
  //   imageFg,
  //   imageBg,
  //   imageShine=null,
  //   options={}
  // ) {
  //   this.init()
  // }
  //
  // init() {
  //
  // }
}
