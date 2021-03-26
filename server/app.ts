import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { createCorsOptionsDelegate } from './utils/util'
import verifyPermission from './middleware/permission'
import { Login } from './routes/sys/managePermission'
import manageRecord from './routes/sys/manageRecords'
import manageImage from './routes/sys/manageImage'
import viewRecords from './routes/web/records'
import addComments from './routes/web/comments'
import subscribe from './routes/web/subscribe'

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

app.get('/music/*', (req, res) => {
    res.sendFile(__dirname + "/" + req.url)
})

// 兼容旧的版本，使用新的 qs 库解析 body 消息体
app.use(express.urlencoded({
    extended: true
}));

// 解析 json 格式请求体
app.use(express.json());

/**
 * 后台系统
 * */
// 系统登录
app.post('/login', Login)
// 后台管理 token 验证 中间件
app.use('/sys/*', verifyPermission)
//      ||
//     \||/
//      \/
// 文章管理 —— 增删改查 文章信息
app.use('/sys/record', manageRecord)
// 上传 / 删除 图片管理
app.use('/sys/image', manageImage)
// 留言信息 管理
app.use('/sys/message', (req, res, next) => {
    res.send({
        success: true,
        data: {},
        message: 'get message list'
    })
})

// 订阅信息 管理
app.use('/sys/subscribe', subscribe)





/**
 * 前端系统
 * */
// 文章信息
app.use('/records', viewRecords)
// 用户评论
app.use('/comments', addComments)
// 用户评论
app.use('/messages', (req, res, next) => {
    res.send({
        success: true,
        data: {},
        message: 'add message list'
    })
})

app.listen(port, () => {
    console.log(`server is listening at ${host}:${port}...`)
})
