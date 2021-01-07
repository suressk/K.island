import express from 'express'
import multer from 'multer'
import { writeHead, writeResult } from '../../utils/writeResponse'
import { deleteImage } from '../../services/back/deleteImage'
import { verifyToken } from '../../utils/jwt'
import { createMulterStorage } from '../../utils/util'

const router = express.Router()

// 存储封面图
const uploadCover = multer({ storage: createMulterStorage('cover') })

// 存储文章内容插图
const uploadIllustration = multer({ storage: createMulterStorage('illustration') })

// 封面图上传
router.post('/upload/cover', uploadCover.single('cover'), (req, res) => {
    const coverUrl = `http://${req.headers.host}/images/cover/${req.file.filename}`
    res.writeHead(200)
    res.write(writeResult(true, "上传成功", {
        cover: coverUrl
    }));
    res.end()
})

// 文章内部插图
router.post('/upload/illustration', uploadIllustration.single('illustration'), (req, res) => {
    const url = `http://${req.headers.host}/images/illustration/${req.file.filename}`
    writeHead(res, 200)
    res.write(writeResult(true, "上传成功", {
        url
    }));
    res.end()
})

// 删除图片文件
router.delete('/', (req, res) => {
    const verified = verifyToken(req)
    if (verified === null) {
        writeHead(res, 200)
        res.write(writeResult(false, '看看是不是 Token 失效啦？'))
        res.end()
    } else {
        const { relativePath } = req.body
        deleteImage(relativePath).then(() => {
            // 删除成功
            writeHead(res, 200)
            res.write(writeResult(true, '删除成功'));
            res.end()
        }).catch(err => {
            // 文件不存在
            if (typeof err === 'string' && err === 'not exist') {
                writeHead(res, 200)
                res.write(writeResult(false, "删除失败，文件不存在"))
                res.end()
            } else {
                // 删除失败
                writeHead(res, 500)
                res.write(writeResult(false, "删除失败", err))
                res.end()
            }
        })
    }
})

export default router
