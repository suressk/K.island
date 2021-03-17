/**
 * 统一 Response
 * @param {*} success 成功与否标志位
 * @param {*} message 提示信息
 * @param {*} data 实际返回的数据体
 * */
import { Response } from 'express'

export function writeResult (success: boolean, message: string, data: object = {}) {
    return JSON.stringify({
        success,
        message,
        data
    })
}

export function writeHead (res: Response, statusCode: number) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html;charset=utf-8' })
}
