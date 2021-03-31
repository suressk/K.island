import {connectQueryPro} from '../dao/DBUtil'
import { UserInfo } from '../common/types'

export function login (options: UserInfo) {
    const sqlStr = 'SELECT username, password FROM `tbl_user` WHERE username = ?'
    const params = [options.username]
    return new Promise((resolve, reject) => {
        // connectQuery(sqlStr, params, success, error)
        connectQueryPro(sqlStr, params)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })

}
