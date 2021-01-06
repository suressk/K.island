import express from 'express'
import multer from 'multer'
import { writeHead, writeResult } from '../../utils/writeResponse'
import { v4 as uuid } from 'uuid'
import { deleteImage } from '../../services/back/deleteImage'

const router = express.Router()
const imgSuffixReg = /[.][a-z]+/

// 存储封面图
const coverStorage = multer.diskStorage({
    destination(req, file, cb) {
        // console.log(file)
        /**
         * file = {
         *     fieldname: "cover", 前端 formData.append('cover', file)
         *     originalname: "login_bg.webp", // 原文件本名
         *     encoding: "7bit",
         *     mimetype: "image/webp" // 文件类型
         * }
         * */
        cb(null, "./images/cover") // 图片存储路径
    },
    filename(req, file, cb) {
        const matchRes = file.originalname.match(imgSuffixReg)
        if (matchRes !== null) {
            file.filename = uuid() + matchRes[0]
            cb(null, file.filename)
        }
    }
})
const uploadCover = multer({ storage: coverStorage })

// 封面图上传
router.post('/upload/cover', uploadCover.single('cover'), (req, res) => {
    const coverUrl = `http://${req.headers.host}/images/cover/${req.file.filename}`
    res.writeHead(200)
    res.write(writeResult(true, "上传成功", {
        cover: coverUrl
    }));
    res.end()
})

// TODO 存储文章内容插图 => 重复代码精简 ===> 并存放于不同文件夹下！！！
const illustrationStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./images/illustration"); // 图片存储路径
    },
    filename(req, file, cb) {
        const matchRes = file.originalname.match(imgSuffixReg)
        if (matchRes !== null) {
            file.filename = uuid() + matchRes[0]
            cb(null, file.filename);
        }
    }
})
const uploadIllustration = multer({ storage: illustrationStorage })
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
    const { path, filename } = req.body
    deleteImage(path, filename).then(() => {
        // 删除成功
        writeHead(res, 200)
        res.write(writeResult(true, '删除成功'));
        res.end()
    }).catch(err => {
        // 删除失败
        writeHead(res, 500)
        res.write(writeResult(true, "删除失败", err));
        res.end()
    })
})

export default router
