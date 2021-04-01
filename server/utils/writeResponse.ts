/**
 * 统一 Response
 * @param {*} success 成功与否标志位
 * @param {*} message 提示信息
 * @param {*} data 实际返回的数据体
 * */
import { Response } from 'express'

export function writeResult (
    res: Response,
    success: boolean,
    message: string,
    data: object = {}
) {
    res.write(
        JSON.stringify({
            success,
            message,
            data
        })
    )
    res.end()
}

export function writeHead (res: Response, statusCode: number) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html;charset=utf-8' })
}
