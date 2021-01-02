import { createConnection } from '../dao/DBUtil'
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query'

interface LoginOptions {
    username: string;
    password: string;
}

export function login (options: LoginOptions, success: (result: any) => void, error: (err: Query.QueryError) => void) {
    const sqlStr = 'SELECT username, password FROM `user` WHERE username = ?'
    const params = [options.username]
    const connection = createConnection()
    connection.connect()
    connection.query(sqlStr, params, ((err, result) => {
        if (!err) {
            success(result)
        } else {
            error(err)
        }
    }))
    connection.end()
}

// export function logout ()
