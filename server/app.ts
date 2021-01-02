import express, { NextFunction, Request, Response } from 'express'
import { CallBack } from './common/types'
import cors from 'cors'
import permission from './routes/permission'

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9527

const WHITE_LIST = ['http://localhost:8080', '*']

let corsOptionsDelegate = (req: Request, callback: CallBack) => {
    let corsOptions: { origin: boolean }
    const reqOrigin: string | undefined = req.header('Origin')
    if (reqOrigin && WHITE_LIST.includes(reqOrigin)) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions);
}

// 跨域配置
app.all('*', cors(corsOptionsDelegate), (req: Request, res: Response, next: NextFunction) => {
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

// app.use(express.static('/'))

// 兼容旧的版本，使用新的 qs 库解析 body 消息体
app.use(express.urlencoded({
    extended: true
}));

// 解析 json 格式请求体
app.use(express.json());

app.use('/back', permission)

app.listen(port, () => {
    console.log(`server is listening at ${host}:${port}...`)
})
