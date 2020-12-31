import express, { Request } from 'express'
import { CallBack } from './types/corsTypes'
import cors from 'cors'

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9527

const WHITE_LIST = ['http://localhost:8080']

// 解析 json 格式请求体
app.use(express.json());

let corsOptionsDelegate = (req: Request, callback: CallBack) => {
    let corsOptions
    // @ts-ignore
    if (WHITE_LIST.includes(req.header('Origin'))) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions);
}

// 跨域配置
app.all('*', cors(corsOptionsDelegate), (req: { method: string; }, res: { sendStatus: (arg0: number) => void; }, next: () => void) => {
    if (req.method.toLowerCase() === 'options') {
        // 快速结束 options 请求
        res.sendStatus(200)
    } else {
        next()
    }
})

// @ts-ignore
app.get('/images/*', (req, res) => {
    // res.sendStatus
    res.sendFile(__dirname, "/" + req.url)
})

app.use(express.static('/'))

// 兼容旧的版本，使用新的 qs 库解析 body 消息体
app.use(express.urlencoded({
    extended: true
}));

app.listen(port, () => {
    console.log(`server is listening at ${host}:${port}...`)
})
