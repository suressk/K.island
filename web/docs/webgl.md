# WebGL {ignore=true}

[toc]

## WebGL 绘制的基本图源

1. 点
2. 线段 → 线带
3. 三角形 → 三角扇区

## 基础概念

1. 顶点着色器： 用来描述顶点特征的程序

    内置变量：

    ```GLSL
    vec4 gl_Position // 表示顶点位置，必须被赋值（否则无法正常工作）
    float gl_PointSize // 表示点的尺寸（像素值）默认 1.0
    ```

2. 片元着色器： 进行逐片元处理过程的程序（如光照）

    内置变量:

    ```GLSL
    vec4 gl_FragColor // 指定片元颜色（RGBA 格式）RGBA 数值取值范围： 0 <= value <= 1; 数值大于 1 与 1 等效; 小于 0 等效于 0.
    ```

3. WebGL 绘制流程

    + 获取 WebGL 绘图上下文 ```const gl = canvasDom.getContext('webgl');```

    + 初始化着色器（顶点着色器，片元着色器）
    + 设置点的坐标信息
    + 设置 `<canvas>` 背景色
    + 清空 `<canvas>`
    + 进行绘制


4. 着色器的变量声明方式 —— 存储限定符

    > - `attribute`: 传输的是与顶点（单独的顶点）相关的数据。
    > - `uniform`: 传输的是与所有顶点都相关（或与顶点无关）的数据（相当于是全局变量）。
    > - `textures`: 纹理（一个数据序列，可以在着色程序运行中随意读取其中的数据。大多数情况存放的是图像数据，但是纹理仅仅是数据序列，也可以随意存放除了颜色以外的其他数据）。
    > - `varying`: 可变变量是一种顶点着色器给片元着色器传值的方式，依照渲染的图元是点，线段还是三角形，顶点着色器中设置的可变量会在片元着色器运行中获取不同的插值。

5. GLSL ES变量类型

    <table>
        <thead style="text-align: center;background-color: #d5d5d5">
            <tr>
                <th>类别</th>
                <th>GLSL ES变量类型</th>
                <th>描述</th>
            </tr>
        </thead>
        <tbody style="text-align: left;">
            <tr>
                <th rowspan="3">矢量</th>
                <td>vec2、vec3、vec4</td>
                <td>具有2、3、4个浮点数的矢量</td>
            </tr>
            <tr>
                <td>ivec2、ivec3、ivec4</td>
                <td>具有2、3、4个整型元素的矢量</td>
            </tr>
            <tr>
                <td>bvec2、bvec3、bvec4</td>
                <td>具有2、3、4个boolean元素的矢量</td>
            </tr>
            <tr>
                <th>矩阵</th>
                <td>mat2、mat3、mat4</td>
                <td>2*2、3*3、4*4 的浮点数矩阵</td>
            </tr>
        </tbody>
    </table>

## Example

### 一、绘制点

1. 初始化着色器：

    ```GLSL
    // 顶点着色器 vertex
    // attribute vec4 a_Position; // 存储限定符 变量类型 变量名;
    void main() {
        gl_Position = vec4(0, 0, 0, 0);
        gl_PointSize = 10.0;
    }
    // 片元着色器 fragment
    void main() {
        gl_FragColor = vec4(0, 0.5, 0.5, 1);
    }
    ```

2. 创建着色器：

    ```GLSL
    // 1. 创建着色器
    const shader = gl.createShader(type); // type: gl.VERTEX_SHADER / gl.FRAGMENT_SHADER

    // 2. 向着色器中添加资源
    gl.shaderSource(shader, source);
    // source 添加的程序（string类型的 GLSL 代码）

    // 3. 编译着色器代码
    gl.compileShader(shader); // shader 要编译的着色器

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS); // 着色器编译状态
    gl.getShaderInfoLog(shader); // 着色器状态信息
    ```

3. 创建程序：

    ```GLSL
    // 1. 创建程序
    const program = gl.createProgram();

    // 2. 绑定着色器程序
    gl.attachShader(program, shader);

    // 3. 连接着色器程序
    gl.linkProgram(program);
    ```

4. 清空画布：

    ```GLSL
    gl.clearColor(0, 0.5, 0.5, 1); // 蓝绿色填充画布区域
    gl.clear(gl.COLOR_BUFFER_BIT); // 清空颜色缓冲区
    ```

5. 绘制图形：

    ```GLSL
    // 执行顶点着色器，按照 mode 参数指定的方式绘制图形
    gl.drawArrays(mode, first, count);

    // 1. mode: gl.POINTS / gl.LINES / gl.LINE_STRIP / gl.TRIANGLES / gl.TRIANGLE_STRIP / gl.TRIANGLE_FAN 非这些类型会报错 INVALID_ENUM
    // 点、线、线带、三角形、三角带、三角扇区
    // 2. first: 从哪个顶点开始绘制 (int) 传负数会报错 INVALID_VALUE
    // 3. count: 绘制需要用到多少个点 (int) 传负数会报错 INVALID_VALUE
    ```

完整示例代码：

```html
<canvas width="500" height="500" id="oCanvas"></canvas>
<script type="notjs" id="vertex">
    void main() {
        gl_Position = vec4(0, 0, 0, 1);
        gl_PointSize = 10.0;
    }
</script>

<script type="notjs" id="fragment">
    void main() {
        gl_FragColor = vec4(1, 0.5, 0, 1);
    }
</script>

<script>
    const canvasDom = document.getElementById('oCanvas');
    const gl = canvasDom.getContext('webgl');
    if (!gl) {
        alert("Your browser isn't support WebGL!");
    }
    // 获取 GLSL 代码 string 文本
    const vertexStr = document.getElementById('vertex').innerText;
    const fragStr = document.getElementById('fragment').innerText;

    // 创建着色器
    function createShader(gl, type, sourceStr) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceStr);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.error(gl.getShaderInfoLog(shader));
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexStr);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragStr);

    // 创建程序
    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        return program;
    }
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    
    gl.clearColor(0, 0.5, 0.5, 1);
    gl.clear(gl.COLOR_BUFFER_BIT); // 清空颜色缓冲区

    gl.drawArrays(gl.POINTS, 0, 1);
</script>
```
