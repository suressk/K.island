/**
 * 获取 webgl context
 * */
export function getContext (canvasDom: HTMLCanvasElement, options = {}) {
  const contextList: [string, string] = ['webgl', 'experimental-webgl']
  let context: RenderingContext | null = null
  contextList.some(name => {
    try {
      context = canvasDom.getContext(name, options)
    } catch (e) {
      throw new Error(e)
    }
    return context !== null
  })

  if (context === null) {
    document.body.classList.add('no-webgl')
  }
  return context
}

/**
 * 创建绘制程序
 * @param{*} gl
 * @param{*} vertexScript
 * @param{*} fragScript
 * */
export function createProgram (gl: WebGL2RenderingContext, vertexScript: string, fragScript: string) {
  const vertexShader = createShader(gl, vertexScript, gl.VERTEX_SHADER)!
  const fragShader = createShader(gl, fragScript, gl.FRAGMENT_SHADER)!

  const program = gl.createProgram()!
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragShader)
  gl.linkProgram(program)

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
    const lastError = gl.getProgramInfoLog(program)
    console.error(`Error in program linking: ${lastError}`)
    gl.deleteProgram(program)
    return null
  }
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord')

  const texCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0
  ]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(texCoordLocation)
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

  // Create a buffer for the position of the rectangle corners.
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  return program
}

/**
 * 创建 shader
 * @param{*} gl
 * @param{*} scriptStr
 * @param{*} type
 * */
function createShader (gl: WebGL2RenderingContext, scriptStr: string, type: number) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, scriptStr)
  gl.compileShader(shader)

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    const lastError = gl.getShaderSource(shader)
    console.error(`Error compile shader of ${shader}: ${lastError}`)
    gl.deleteShader(shader)
    return null
  }
  return shader
}
