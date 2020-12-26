/* eslint-disable */
import { getAction, postAction } from '@/api/manage'
import axios from 'axios'

const getBg = (params: string | object) => getAction('/images/bg.webp', params = {})
const getHello = (params: string | object | undefined) => getAction('/', params = {})

// type CompressParam = {
//   name: string;
//   compress: number;
//   oriSize: number;
//   type: string;
//   fileSelect: File;
//   resetQua: number;
//   src: string;
//   pngLess: number;
//   isOa: number;
//   typeChange: number;
// }

const postCompressImage = (params: FormData) => axios('https://zhitu.isux.us/index.php/preview/imgcompress', {
  data: params,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export {
  getBg,
  getHello,
  postCompressImage
}
