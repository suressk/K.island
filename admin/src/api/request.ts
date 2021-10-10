import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseData, ErrorResponse } from '../types'
import { getStorageToken, errorNotify, confirmPro, getStorageItem, setStorageItem, removeStorageItem } from '../utils/util'
import { ACCESS_TOKEN, TOKEN_EXPIRED } from '../store/mutation-types'
import router from '../router'

// export const domainUrl = 'xxx'
export const domainUrl = 'http://localhost:9527'

const service: AxiosInstance = axios.create({
    baseURL: domainUrl + '/sys' || '/sys',
    timeout: 9000
})

const handleError = (err: ErrorResponse) => {
    if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
        errorNotify('Request Timeout, Please Wait For Trying Again Later...', 'Timeout')
        return Promise.reject(err)
    }
    if (err.response) {
        // @ts-ignore
        const { data, status } = err.response
        const tokenExpired = getStorageItem(TOKEN_EXPIRED)

        switch (status) {
            case 403:
                errorNotify('The Token Has Expired', `${status}`)
                removeStorageItem(ACCESS_TOKEN)
                new Promise((resolve, reject) => {
                    if (tokenExpired === 0) {
                        confirmPro('Token has expired, redirect to Login Page?')
                            .then(() => {
                                router.replace('/login')
                                resolve(1)
                            })
                            .catch(() => {
                                reject(0)
                            })
                    } else {
                        reject(0)
                    }
                }).then(() => {
                    setStorageItem(TOKEN_EXPIRED, 1)
                }, () => {
                    setStorageItem(TOKEN_EXPIRED, 0)
                })
                break
            case 404:
                errorNotify('Resource Not Found', `${status}`)
                break
            case 416:
                errorNotify('Incorrect Request Parameters !', `${status}`)
                break
            case 500:
                errorNotify('Server Internal Error', `${status}`)
                break
            default:
                errorNotify(data.message, `${status}`)
                break
        }
    }
    return Promise.reject(err)
}

/**
 * request interceptor
 */
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config.method === 'get') {
            config.params = {
                _t: Math.floor(Date.now() / 1000),
                ...config.params
            }
        }
        const token: string | null = getStorageToken()
        if (token) {
            config.headers.authorization = token
        }
        return config
    },
    err => Promise.reject(err)
)

/**
 * response interceptor
 */
service.interceptors.response.use((resp: AxiosResponse): AxiosResponse<ResponseData<any>> => {
    return resp.data
}, handleError)

export default service
