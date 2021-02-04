export function waveRecord(canvasRef: HTMLCanvasElement) {
  //获取画布
  const ctx = canvasRef.getContext('2d')! //设置波浪海域（海浪宽度，高度）
  const bezierWidth = canvasRef.width
  const bezierHeight = canvasRef.height
  const bezierLineWidth = 2//曲线
  const sinX = 0
  const sinY = bezierHeight / 2//轴长
  const axisLength = bezierWidth//弧度宽度
  const waveWidth = 0.014//海浪高度
  const waveHeight = bezierHeight / 15.0
  const speed = 0.1 //数值越大速率越快
  let xSpeed = 0 //波浪横向的偏移量
  let rand = bezierHeight //波浪高度

  ctx.lineWidth = bezierLineWidth

  // 创建静态的曲线
  let drawSin = (xSpeed: number) => {
    ctx.save()
    let points = [] // 存放贝塞尔曲线的各个点
    ctx.beginPath()
    // 创建贝塞尔点
    for (let x = sinX; x < sinX + axisLength; x += 80 / axisLength) {
      // let y = -Math.sin((sinX + x) * waveWidth)  //测试请解开注释，注释下一行
      let y = -Math.sin((sinX + x) * waveWidth + xSpeed)
      // points.push([x, sinY + y * waveHeight]) //测试请解开注释，注释下一行
      points.push([x, rand + y * waveHeight])
      ctx.lineTo(x, sinY + y * waveHeight)  //测试请解开注释，注释下一行
      // ctx.lineTo(x, rand + y * waveHeight)
    }

    ctx.lineTo(axisLength, bezierHeight)
    ctx.lineTo(sinX, bezierHeight)
    ctx.lineTo(points[0][0], points[0][1])
    ctx.stroke()
    ctx.restore()       //贝塞尔曲线样式设置
    ctx.strokeStyle = '#3bc777'
    ctx.fillStyle = '#3bc777'
    ctx.fill()
  }

  const rendY =  () => {
    ctx.clearRect(0, 0, bezierWidth, bezierHeight)        //控制海浪高度
    let tmp = 0.1
    rand -= tmp
    let b = bezierHeight - rand
    //控制循环涨潮
    if (b == bezierHeight) {
      rand = bezierHeight
    }
    drawSin(xSpeed)
    xSpeed += speed
    requestAnimationFrame(rendY)
  }

  // 动态
  drawSin(xSpeed)
  rendY()
}
