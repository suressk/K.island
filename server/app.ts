import express, { Request } from "express";
import { CallBack } from "./types/corsTypes";

// @ts-ignore
const app = new express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9527

const cors = require('cors')
const WHITE_LIST = ['http://localhost:8080']

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

app.all('*', cors(corsOptionsDelegate), (req: { method: string; }, res: { sendStatus: (arg0: number) => void; }, next: () => void) => {
    if (req.method.toLowerCase() === 'options') {
        // 快速结束 options 请求
        res.sendStatus(200)
    } else {
        next()
    }
})

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send('hello')
})

// @ts-ignore
app.get('/images/*', (req, res) => {
    // console.log(req)
    res.writeHead(200)
    res.sendFile(__dirname, "/" + req.url)
})

app.listen(port, () => {
    console.log(`server is listening at ${host}:${port}...`)
})
