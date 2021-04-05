import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {ResponseData, ErrorResponse} from '../types'
import {getStorageToken, errorNotify, Confirm, getStorageItem, setStorageItem, removeStorageItem} from '../utils/util'
import {ACCESS_TOKEN, TOKEN_EXPIRED} from '../store/mutation-types'
import router from '../router'
// import {useRouter} from 'vue-router'

const service: AxiosInstance = axios.create({
    baseURL: 'http://localhost:9527' || '/',
    timeout: 9000
})

const handleError = (err: ErrorResponse) => {
    if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
        errorNotify('Request Timeout, Please Wait For Trying Again Later...', 'Timeout')
    }
    if (err.response) {
        // @ts-ignore
        const data = err.response.data
        const status = err.response.status
        const tokenExpired = getStorageItem(TOKEN_EXPIRED)
        // debugger
        // console.log(router)
        // const router = useRouter() // TODO ========= get undefined

        switch (status) {
            case 403:
                errorNotify('Token has expired...', `${status}`)
                removeStorageItem(ACCESS_TOKEN)
                if (tokenExpired === 0) {
                    Confirm({
                        title: 'Confirm',
                        content: 'Token has expired, redirect to Login Page?',
                        onOk: () => {
                            router.push('/login')
                        },
                        onCancel: () => undefined
                    })
                    setStorageItem(TOKEN_EXPIRED, 1)
                }
                break
            case 404:
                errorNotify('Resource Not Found...', `${status}`)
                break
            case 500:
                errorNotify('Server Internal Error...', `${status}`)
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
    // const data = resp.data.data;
    // if (data.token) {
    //   // LocalStorage 存储 token
    //   setStorageToken(data.token)
    // }
    return resp.data
}, handleError)

export {service as axios}
