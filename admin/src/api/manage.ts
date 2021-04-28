import { axios } from './request'

type URL = string
type Params = undefined | object

export function getAction (url: URL, params?: Params) {
  return axios({
    url,
    method: 'get',
    params
  })
}

export function postAction (url: URL, data: Params = {}) {
  return axios({
    url,
    method: 'post',
    data
  })
}

/**
 * 修改
 * */
export function putAction (url: URL, data: Params) {
  return axios({
    url,
    method: 'put',
    data
  })
}

export function deleteAction (url: URL, data: Params = {}) {
  return axios({
    url: url,
    method: 'delete',
    data
  })
}

export function postUploadImage (url: string, data: FormData) {
  return axios({
    url,
    data,
    method: 'post',
    headers: {
      cache: false,
      'Content-Type': 'multipart/form-data',
      contentType: false,
      processData: false
    }
  })
}
