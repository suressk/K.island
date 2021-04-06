import mysql from 'mysql2'

/**
 * 创建连接池
 * */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'xxx',
    database: 'k_island',
    charset: 'utf8',
    waitForConnections: true, // true: 连接排队等待可用连接。false: 立即抛出错误
    connectionLimit: 10, // 单次可创建最大连接数
    queueLimit: 0 // 连接池的最大请求数，从 getConnection 方法前依次排队。 0: 没有限制
})

const promisePool = pool.promise()

// acquireTimeout: 5000, // 获取连接超时的毫秒数 TODO 【提示移除此配置项】

// pool.query() || pool.execute() || pool.getConnection()
// query() 和 execute() 会自动获取连接并自动释放连接

// 手动创建连接池连接
// pool.getConnection(function(err, conn) {
//     conn.query('');
//     // 完成后释放连接
//     conn.release();
// })

/**
 * 创建数据库连接
 * */
// export function createConnection() {
//     return mysql.createConnection({
//         host: 'localhost',
//         port: 3306,
//         user: 'root',
//         password: 'xxx',
//         database: 'k_island'
//     });
// }

/**
 * 单次创建数据库连接查询
 * */
// export function connectQueryPro (sqlStr: string, params: any[]) {
//     return new Promise((resolve, reject) => {
//         const connection = createConnection()
//         connection.connect()
//         connection.query(sqlStr, params, ((err: any, result: any) => {
//             if (!err) {
//                 resolve(result)
//             } else {
//                 reject(err)
//             }
//         }))
//         connection.end()
//     })
// }

/**
 * 连接池连接查询
 * */
export function poolQuery (sqlStr: string, params: any[]) {
    return new Promise((resolve, reject) => {

        pool.query(sqlStr, params, ((err: any, result: any) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        }))
    })
}

/**
 * promise 式
 * */
export function promisePoolQuery (sqlStr: string, params: any[]) {
    return promisePool.query(sqlStr, params)
}
