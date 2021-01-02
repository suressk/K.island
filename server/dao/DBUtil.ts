import mysql from 'mysql2'

export function createConnection () {
    return mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "xxx",
        database: "K_island"
    });
}
