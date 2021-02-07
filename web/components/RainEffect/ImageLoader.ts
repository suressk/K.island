import {IImage, IRes} from "./types";

function loadImage(srcObj: IImage, i: number, onLoad: Function | undefined) {
  return new Promise(resolve => {
    const img = new Image()
    srcObj.img = img
    img.addEventListener('load', (e) => {
      if (onLoad) {
        onLoad.call(null, img, i)
      }
      resolve(srcObj)
    })
    img.src = srcObj.src
  })
}

function loadImages(images: IImage[], onLoad: Function | undefined) {
  return Promise.all(images.map((image, i) => {
    return loadImage(image, i, onLoad)
  }))
}

export default function ImageLoader(images: IImage[], onLoad?: Function) {
  return new Promise<IImage>(resolve => {
    loadImages(images, onLoad).then((loadedImages) => {
      let res: IRes = {}
      loadedImages.forEach(curImage => {
        // @ts-ignore
        res[curImage.name] = {
          // @ts-ignore
          img: curImage.img,
          // @ts-ignore
          src: curImage.src,
        }
      })
      // @ts-ignore
      resolve(res)
    })
  })
}
