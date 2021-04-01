import mysql from 'mysql2'

export function createConnection () {
    return mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "xxx",
        database: "k_island"
    });
}

export function connectQueryPro (sqlStr: string, params: any[]) {
    return new Promise((resolve, reject) => {
        const connection = createConnection()
        connection.connect()
        connection.query(sqlStr, params, ((err: any, result: any) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        }))
        connection.end()
    })
}
