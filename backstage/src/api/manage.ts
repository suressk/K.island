import { axios } from './request'

export function getAction (url: string, params: object | string | undefined) {
  return axios({
    method: 'get',
    url,
    params
  })
}

// export function postA
