import fs from 'fs'
import path from 'path'

function resolvePath (relativePath: string) {
    // @ts-ignore
    return path.join(__dirname, '../', relativePath)
}

/**
 * 检查文件是否存在
 * */
function checkFileExist (filePath: string) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err: any) => {
            // 文件不存在
            if (err) {
                reject()
            } else {
                resolve('')
            }
        })
    })
}

/**
 * 删除图片
 * */
export function deleteImage (relativePath: string) {
    let fullPath = resolvePath(relativePath)
    // 替换可能存在的 "//" 或 "\\"
    fullPath = fullPath.replace('//', '/')
    fullPath = fullPath.replace('\\\\', '\\')
    return new Promise((resolve, reject) => {
        checkFileExist(fullPath).then(() => {
            fs.unlink(fullPath, (err: any) => {
                if (!err) {
                    resolve('success')
                } else {
                    reject(err)
                }
            });
        }).catch(() => {
            reject('not exist')
        })
    })
}


