import {poolQuery} from '../db/DBUtil'
import {AuthorInfo} from '../common/types'

export function login(options: AuthorInfo) {
    const sqlStr = 'SELECT username, password FROM `tbl_user` WHERE username = ?;'
    const params = [options.username]
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })

}
