import express from 'express'
import multer from 'multer'
import {writeHead, writeResult} from '../../utils/writeResponse'
import {uploadService, NOT_EXIST} from '../../services/uploadService'
import {createMulterStorage} from '../../utils/util'
import {SERVER_ORIGIN} from "../../common/definition";

const router = express.Router()

// 存储封面图
const uploadCover = multer({storage: createMulterStorage('cover')})

// // 存储文章内容插图（弃）
// const uploadIllustration = multer({storage: createMulterStorage('plate')})

// 封面图上传
router.post('/cover', uploadCover.single('cover'), (req, res) => {
    // req.headers.host 由于 Nginx 代理的作用，经过转发，host 地址会变更为 127.0.0.1 (即服务器本机地址)
    const cover = `http://${SERVER_ORIGIN}/uploads/cover/${req.file.filename}`
    res.writeHead(200)
    writeResult(res, true, "Successfully uploaded the cover !", {cover})
})

// // 文章内部插图（弃）
// router.post('/plate/add', uploadIllustration.single('plate'), (req, res) => {
//     const url = `http://${req.headers.host}/uploads/plate/${req.file.filename}`
//     writeHead(res, 200)
//     writeResult(res, true, "Successfully uploaded plate !", {url})
// })

// 删除图片文件（或其他上传的文件）
router.delete('/delete', (req, res) => {
    const {relativePath} = req.body
    uploadService(relativePath).then(() => {
        // 删除成功
        writeHead(res, 200)
        writeResult(res, true, 'Successfully deleted !')
    }).catch(err => {
        // 文件不存在
        if (err.message === NOT_EXIST) {
            writeHead(res, 200)
            writeResult(res, false, "Failed to delete, the file doesn't exist !")
        } else {
            // 删除失败
            writeHead(res, 500)
            writeResult(res, false, "Failed to delete", err)
        }
    })
})

export default router
