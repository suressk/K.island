import multer from 'multer'
import { v4 as uuid } from 'uuid'
import { Request, Response } from 'express'
import { CallBack, UpdateRecordOptions } from '../common/types'
import { verifyToken } from './jwt'
import { writeHead, writeResult } from './writeResponse'
import dayjs from 'dayjs'

const imgSuffixReg = /[.][a-z]+/

/**
 * 创建图片存储处理函数
 * */
export function createMulterStorage (dir: string) {
    return multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './images/' + dir) // 图片存储路径
        },
        filename(req, file, cb) {
            const matchRes = file.originalname.match(imgSuffixReg)
            if (matchRes !== null) {
                file.filename = uuid() + matchRes[0]
                cb(null, file.filename)
            }
        }
    })
}

/**
 * 跨域配置
 * */
const WHITE_LIST = ['http://localhost:8080', 'http://localhost:8888', '*']

/**
 * 创建跨域处理函数
 * */
export function createCorsOptionsDelegate (req: Request, callback: CallBack) {
    let corsOptions: { origin: boolean }
    const reqOrigin: string | undefined = req.header('Origin')
    if (reqOrigin && WHITE_LIST.includes(reqOrigin)) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions);
}

export function verifyTokenResponse (req: Request, res: Response, callback: () => void) {
    const verified = verifyToken(req)
    if (verified === null) {
        writeHead(res, 200)
        res.write(writeResult(false, '看看是不是 Token 失效啦？'))
        res.end()
    } else {
        callback()
    }
}

export function getUpdateRecordParams (options: UpdateRecordOptions) {
    const { id, uid } = options
    let sqlStr!: string
    const params: any[] = []
    const utime = new Date().getTime()
    if (options.is_delete) {
        sqlStr = 'UPDATE records SET is_delete = ?, utime = ? WHERE id = ? and uid = ?'
        params.push(options.is_delete)
    } else if (options.views) {
        sqlStr = 'UPDATE records SET views = ?, utime = ? WHERE id = ? and uid = ?'
        params.push(options.views)
    } else {
        sqlStr = 'UPDATE records SET title = ?, tag = ?, introduce = ?, content = ?, cover = ?, utime = ? WHERE id = ? and uid = ?'
        params.push(options.title, options.tag, options.introduce, options.content, options.cover)
    }
    params.push(utime, id, uid)
    return {
        sqlStr,
        params
    }
}

const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const specialDay = {
    1: '1st',
    2: '2nd',
    3: '3rd',
    21: '21st',
    22: '22nd',
    23: '23rd',
    31: '31st'
}

/**
 * 日期格式化
 * */
export function dateFormat (timeTemp: number) {
    // 时间戳 => '2021-02-27 22:56' => ['2021', '02', '27', '22', '56']
    let time: string | string[] = dayjs(timeTemp).format('YYYY-MM-DD HH:mm')
    const reg = /-|:|\ /g
    time = time.replace(reg, ',').split(',')
    // 天数取整 => 英文天数记
    const day = parseInt(time[2]) + ''
    // @ts-ignore
    const enDay = specialDay[day] ? specialDay[day] : (day + 'th') as string
    return {
        year: time[0],
        month: enMonths[parseInt(time[1])],
        monthNum: parseInt(time[1]) + 1,
        day: enDay,
        hour: time[3],
        minute: time[4]
    }
}

interface ArticleListInfo {
    id: number;
    uid: string;
    title: string;
    introduce: string;
    tag: string;
    views: number;
    cover: string;
    ctime: number;
    utime: number;
}

/**
 * 创建时间对象
 * */
export function mapCreateTime (dataList: ArticleListInfo[]) {
    return dataList.map(item => ({ ...item, time: dateFormat(item.ctime) }))
}

/**
 * 插入 time: dateFormat() => time
 * 生成按年分组的数据
 * */
export function mapYearGroup (dataList: ArticleListInfo[]) {
    const mapData = mapCreateTime(dataList)
    const data: any = {}
    const years: string[] = [] // 所有年份
    mapData.forEach(item => {
        if (!years.includes(item.time.year)) {
            years.push(item.time.year)
        }
    })
    const yearLen = years.length
    // 年份从大到小排序
    years.sort((a, b) => Number(b) - Number(a))
    for (let i = 0; i < yearLen; i++) {
        const sortData = mapData.filter(item => item.time.year === years[i])
        // 月份从大到小排序
        sortData.sort((a, b) => (b.time.monthNum - a.time.monthNum))
        data[years[i]] = sortData
    }
    return data
}
