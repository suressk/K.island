function loadImage(src, i, onLoad) {
  return new Promise(resolve => {
    if (typeof src == "string") {
      src = {
        name: "image" + i,
        src,
      };
    }

    let img = new Image();
    src.img = img;
    img.addEventListener("load", () => {
      if (typeof onLoad == "function") {
        onLoad.call(null, img, i);
      }
      resolve(src);
    });
    img.src = src.src;
  })
}

function loadImages(images, onLoad) {
  return Promise.all(images.map((src, i) => {
    return loadImage(src, i, onLoad);
  }));
}

export default function ImageLoader(images, onLoad) {
  return new Promise(resolve => {
    loadImages(images, onLoad).then(loadedImages => {
      let res = {};
      loadedImages.forEach(curImage => {
        res[curImage.name] = {
          img: curImage.img,
          src: curImage.src,
        };
      })
      resolve(res);
    });
  })
}
