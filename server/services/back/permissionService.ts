import { connectQuery } from '../../dao/DBUtil'
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query'
import { LoginOptions } from '../../common/types'

export function login (options: LoginOptions, success: (result: any) => void, error: (err: Query.QueryError) => void) {
    const sqlStr = 'SELECT username, password FROM `user` WHERE username = ?'
    const params = [options.username]
    connectQuery(sqlStr, params, success, error)
}

// export function logout ()
