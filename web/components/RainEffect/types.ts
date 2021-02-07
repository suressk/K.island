export type ISource = ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | OffscreenCanvas

export interface IImage {
  src: string;
  name: string;
  img?: HTMLImageElement;
}

export interface IRes {
  [prop: string]: string;
}
