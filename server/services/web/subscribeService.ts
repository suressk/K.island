import { connectQuery } from '../../dao/DBUtil'

interface QuerySubscribeOptions {
    email: string;
    name: string;
}

/**
 * 查询订阅信息
 * */
export function querySubscribeInfo (options: QuerySubscribeOptions, success: (res: any) => void, error: (err: any) => void) {
    const { email } = options
    const sqlStr = 'SELECT * FROM `subscribe` WHERE email = ?'
    connectQuery(sqlStr, [email], success, error)
}

/**
 * 新增订阅邮箱信息
 * */
export function addSubscribeInfo (options: QuerySubscribeOptions, success: (res: any) => void, error: (err: any) => void) {
    const { email, name } = options
    const sqlStr = 'INSERT INTO `subscribe` (email, name) values (?, ?)'
    connectQuery(sqlStr, [email, name], success, error)
}
