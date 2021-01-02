export interface CorsOption {
    origin: boolean
}

export type CallBack = (arg0: null, arg1: CorsOption) => void

export interface UserInfo {
    username: string;
    password: string;
}
