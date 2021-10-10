import { AxiosPromise, AxiosResponse } from 'axios'
import axios from './request'

type URL = string
type Params = undefined | object

export function getAction<D>(url: URL, params?: Params): Promise<AxiosResponse<D>> {
  return axios({
    url,
    method: 'get',
    params
  })
}

export function postAction<D>(url: URL, data: Params = {}): Promise<AxiosResponse<D>> {
  return axios({
    url,
    method: 'post',
    data
  })
}

/**
 * 修改
 * */
export function putAction<D>(url: URL, data: Params): AxiosPromise<D> {
  return axios({
    url,
    method: 'put',
    data
  })
}

export function deleteAction<D>(url: URL, data: Params = {}): AxiosPromise<D> {
  return axios({
    url: url,
    method: 'delete',
    data
  })
}

export function postUploadImage<D>(url: string, data: FormData): AxiosPromise<D> {
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
