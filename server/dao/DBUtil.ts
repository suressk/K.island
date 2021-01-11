import mysql from 'mysql2'
import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";

function createConnection () {
    return mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "NdMexHd.Qwert...",
        database: "k_island"
    });
}

export function connectQuery (sqlStr: string, params: any[], success: (result: any) => void, error: (err: Query.QueryError) => void) {
    const connection = createConnection()
    connection.connect()
    connection.query(sqlStr, params, ((err, result) => {
        if (!err) {
            console.log(result)
            success(result)
        } else {
            error(err)
        }
    }))
    connection.end()
}
