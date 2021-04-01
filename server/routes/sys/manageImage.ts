import express from 'express'
import multer from 'multer'
import { writeHead, writeResult } from '../../utils/writeResponse'
import { deleteImage } from '../../services/deleteImage'
import { createMulterStorage } from '../../utils/util'

const router = express.Router()

// 存储封面图
const uploadCover = multer({ storage: createMulterStorage('cover') })

// 存储文章内容插图
const uploadIllustration = multer({ storage: createMulterStorage('plate') })

// 封面图上传
router.post('/upload_cover', uploadCover.single('cover'), (req, res) => {
    const cover = `http://${req.headers.host}/images/cover/${req.file.filename}`
    res.writeHead(200)
    writeResult(res, true, "Successfully upload !", { cover })
})

// 文章内部插图
router.post('/upload_plate', uploadIllustration.single('plate'), (req, res) => {
    const url = `http://${req.headers.host}/images/plate/${req.file.filename}`
    writeHead(res, 200)
    writeResult(res, true, "Successfully upload !", { url })
})

// 删除图片文件
router.delete('/', (req, res) => {
    const { relativePath } = req.body
    deleteImage(relativePath).then(() => {
        // 删除成功
        writeHead(res, 200)
        writeResult(res, true, 'Successfully deleted !')
    }).catch(err => {
        // 文件不存在
        if (typeof err === 'string' && err === 'not exist') {
            writeHead(res, 200)
            writeResult(res, false, "Failed to delete, file isn't exist !")
        } else {
            // 删除失败
            writeHead(res, 500)
            writeResult(res, false, "Failed to delete", err)
        }
    })
})

export default router
