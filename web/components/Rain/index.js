import createCanvas from './createCanvas'
import RainRenderer from "./RainRenderer"
import Raindrops from "./RainDrops"
import Gsap from 'gsap'
import loadImages from "./ImageLoader"

let textureRainFg, textureRainBg,
  textureFalloutFg, textureFalloutBg,
  textureDrizzleFg, textureDrizzleBg,
  dropColor, dropAlpha;

let textureFg,
  textureFgCtx,
  textureBg,
  textureBgCtx;

const textureBgSize = {
  width: 384,
  height: 256
}
const textureFgSize = {
  width: 96,
  height: 64
}

const parallax = {x: 0, y: 0}

let raindrops,
  renderer,
  canvas;

export default function loadTextures() {
  loadImages([
    {name: "dropAlpha", src: require("./img/drop-alpha.png")},
    {name: "dropColor", src: require("./img/drop-color.png")},

    {name: "textureRainFg", src: require("./img/weather/texture-rain-fg.png")},
    {name: "textureRainBg", src: require("./img/weather/texture-rain-bg.png")},

    {name: "textureFalloutFg", src: require("./img/weather/texture-fallout-fg.png")},
    {name: "textureFalloutBg", src: require("./img/weather/texture-fallout-bg.png")},

    {name: "textureDrizzleFg", src: require("./img/weather/texture-drizzle-fg.png")}, // 细雨
    {name: "textureDrizzleBg", src: require("./img/weather/texture-drizzle-bg.png")},
  ]).then((images) => {
    textureRainFg = images.textureRainFg.img;
    textureRainBg = images.textureRainBg.img;

    textureFalloutFg = images.textureFalloutFg.img;
    textureFalloutBg = images.textureFalloutBg.img;

    textureDrizzleFg = images.textureDrizzleFg.img;
    textureDrizzleBg = images.textureDrizzleBg.img;

    dropColor = images.dropColor.img;
    dropAlpha = images.dropAlpha.img;

    init();
  });
}

function init() {
  canvas = document.getElementById('coverContainer');

  let dpi = window.devicePixelRatio;
  canvas.width = window.innerWidth * dpi;
  canvas.height = window.innerHeight * dpi;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  raindrops = new Raindrops(
    canvas.width,
    canvas.height,
    dpi,
    dropAlpha,
    dropColor, {
      trailRate: 1,
      trailScaleRange: [0.2, 0.45],
      collisionRadius: 0.45,
      dropletsCleaningRadiusMultiplier: 0.28,
    });

  textureFg = createCanvas(textureFgSize.width, textureFgSize.height);
  textureFgCtx = textureFg.getContext('2d');
  textureBg = createCanvas(textureBgSize.width, textureBgSize.height);
  textureBgCtx = textureBg.getContext('2d');

  generateTextures(textureRainFg, textureRainBg);

  renderer = new RainRenderer(canvas, raindrops.canvas, textureFg, textureBg, null, {
    brightness: 1.04,
    alphaMultiply: 6,
    alphaSubtract: 3,
    minRefraction: 256,
    maxRefraction: 512
  });
  setupParallax()
}

function setupParallax() {
  document.addEventListener('mousemove', (event) => {
    let x = event.pageX;
    let y = event.pageY;

    Gsap.to(parallax, 1, {
      x: (x * 2 / canvas.width) - 1,
      y: (y * 2 / canvas.height) - 1,
      // ease: Quint.easeOut,
      onUpdate: () => {
        renderer.parallaxX = parallax.x;
        renderer.parallaxY = parallax.y;
      }
    })
  })
}

function generateTextures(fg, bg, alpha = 1) {
  textureFgCtx.globalAlpha = alpha;
  textureFgCtx.drawImage(fg, 0, 0, textureFgSize.width, textureFgSize.height);

  textureBgCtx.globalAlpha = alpha;
  textureBgCtx.drawImage(bg, 0, 0, textureBgSize.width, textureBgSize.height);
}
