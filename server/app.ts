import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { createCorsOptionsDelegate } from './utils/util'
import permission from './routes/back/permission'
import manageRecord from './routes/back/records'
import manageImage from './routes/back/manageImage'
import viewRecords from './routes/web/records'
import addComments from './routes/web/comments'

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9527

// 跨域配置
app.all('*', cors(createCorsOptionsDelegate), (req: Request, res: Response, next: NextFunction) => {
    if (req.method.toLowerCase() === 'options') {
        // 快速结束 options 请求
        res.sendStatus(200)
    } else {
        next()
    }
})

app.get('/images/*', (req, res) => {
    res.sendFile(__dirname + "/" + req.url)
})

// app.get('/music/*', (req, res) => {
//     res.sendFile(__dirname + "/" + req.url)
// })

// 兼容旧的版本，使用新的 qs 库解析 body 消息体
app.use(express.urlencoded({
    extended: true
}));

// 解析 json 格式请求体
app.use(express.json());

/**
 * 后台管理
 * */
// 系统登录 / 退出登录
app.use('/sys', permission)
// 文章管理 —— 增删改查 文章信息
app.use('/back/record', manageRecord)
// 上传 / 删除 图片
app.use('/image', manageImage)

/**
 * 前端展示
 * */
// 文章信息
app.use('/records', viewRecords)
// 用户评论
app.use('/comments', addComments)

app.listen(port, () => {
    console.log(`server is listening at ${host}:${port}...`)
})
