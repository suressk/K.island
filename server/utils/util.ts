import multer from 'multer'
import {v4 as uuid} from 'uuid'
import {Request} from 'express'
import {RecordItem, CorsOption, UpdateRecordParams} from '../common/types'
import DAYJS from 'dayjs'

const imgSuffixReg = /[.][a-z]+/

/**
 * 创建图片存储处理函数
 * */
export function createMulterStorage(dir: string) {
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
const WHITE_LIST = ['http://localhost:8108', 'http://localhost:8888', '*']

type Callback = (arg0: null, arg1: CorsOption) => void

/**
 * 创建跨域处理函数
 * */
export function createCorsOptionsDelegate(req: Request, callback: Callback) {
    let corsOptions: { origin: boolean }
    const reqOrigin: string | undefined = req.header('Origin')
    if (reqOrigin && WHITE_LIST.includes(reqOrigin)) {
        corsOptions = {origin: true}
    } else {
        corsOptions = {origin: false}
    }
    callback(null, corsOptions);
}

/**
 * 更新文章参数
 * 1. 显隐 => is_delete: 0 / 1
 * 2. 浏览量 => views: number
 * 3. 点赞 => liked: number
 * 4. 文章内容更新 => title, tag, introduce, cover, music
 * */
export function getUpdateRecordParams(options: UpdateRecordParams) {
    const {id, uid} = options
    let sqlStr: string
    const params: any[] = []
    const utime = Date.now()
    if (options.is_delete === 0 || options.is_delete === 1) {
        sqlStr = 'UPDATE `tbl_records` SET is_delete = ?, utime = ? WHERE id = ? AND uid = ?;'
        params.push(options.is_delete, utime)
    } else if (options.views) {
        sqlStr = 'UPDATE `tbl_records` SET views = ? WHERE id = ? AND uid = ?;'
        params.push(options.views)
    } else if (options.liked) {
        sqlStr = 'UPDATE `tbl_records` SET liked = ? WHERE id = ? AND uid = ?;'
        params.push(options.liked)
    } else {
        sqlStr = 'UPDATE `tbl_records` SET title = ?, tag = ?, introduce = ?, content = ?, music = ?, cover = ?, utime = ? WHERE id = ? AND uid = ?;'
        params.push(
            options.title,
            options.tag,
            options.introduce,
            options.content,
            options.music,
            options.cover,
            utime
        )
    }
    params.push(id, uid)
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
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * 日期格式化
 * */
export function dateFormat(timeTemp: number) {
    // 时间戳 => '2021-02-27 22:56:34' => ['2021', '02', '27', '22', '56', '34']
    let time: string | string[] = DAYJS(timeTemp).format(DATE_FORMAT)
    // const reg = /-|:|\ /g
    const reg = /[-: ]/g
    time = time.replace(reg, ',').split(',')
    // 天数取整 => 英文天数记
    const day = +time[2]
    // @ts-ignore
    const enDay = specialDay[day] ? specialDay[day] : (day + 'th') as string
    return {
        year: time[0],
        month: enMonths[+time[1]],
        monthNum: +time[1] + 1,
        day: enDay,
        hour: time[3],
        minute: time[4],
        second: time[5]
    }
}

/**
 * 创建时间对象
 * */
export function mapCreateTime(dataList: RecordItem[]) {
    return dataList.map(item => ({...item, time: dateFormat(item.ctime)}))
}

// /**
//  * 插入 time: dateFormat() => time
//  * 生成按年分组的数据
//  * */
// export function mapYearGroup (dataList: RecordItem[]) {
//     const mapData = mapCreateTime(dataList)
//     const data: any = {}
//     const years: string[] = [] // 所有年份
//     mapData.forEach(item => {
//         if (!years.includes(item.time.year)) {
//             years.push(item.time.year)
//         }
//     })
//     const yearLen = years.length
//     // 年份从大到小排序
//     years.sort((a, b) => Number(b) - Number(a))
//     for (let i = 0; i < yearLen; i++) {
//         const sortData = mapData.filter(item => item.time.year === years[i])
//         // 月份从大到小排序
//         sortData.sort((a, b) => (b.time.monthNum - a.time.monthNum))
//         data[years[i]] = sortData
//     }
//     return data
// }

/**
 * 获取区间随机整数（区间：[min, max) ）
 * */
function getRandomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 生成 6 位随机验证码
 * */
export function createRandomVerifyCode() {
    const randomArr = [
        '0', '1', '2', '3', '4', '5',
        '6', '7', '8', '9', 'A', 'B',
        'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    const len = randomArr.length
    let res = ''
    for (let i = 0; i < 6; i++) {
        res += randomArr[getRandomNum(0, len)]
    }
    return res
}

/**
 * 多条删除 sql 语句
 * */
export function getTableDeleteSqlStr(list: any[], tableName: string, conditionName: string) {
    const arr: string[] = []
    arr.length = list.length
    arr.fill('?')
    return ('DELETE FROM ' + tableName + ' WHERE ' + conditionName + ' IN (' + arr.join(',') + ');')
}

/**
 * 评论列表分组
 * */
export function groupCommentList(list: any[]) {
    // 一级
    const result: any[] = list.filter(item => item.parentId === null)
    const otherItems = list.filter(item => item.parentId !== null)
    // 按时间排序就放置于浏览器处理了
    for (const resItem of result) {
        !resItem.children && (resItem.children = [])
        otherItems.forEach((item, index) => {
            if (item.parentId === resItem.id) {
                resItem.children.push(item)
                delete otherItems[index] // 此举为下次循环稍作优化，减少后续内层循环次数
            }
        })
    }
    return result
}
