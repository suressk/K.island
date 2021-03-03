import fs from 'fs'
import path from 'path'

function resolvePath (relativePath: string) {
    // @ts-ignore
    return path.join(__dirname, '../../', relativePath)
}

function fileExist (filePath: string) {
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

export function deleteImage (relativePath: string) {
    let fullPath = resolvePath(relativePath)
    // 替换可能存在的 "//" 或 "\\"
    fullPath = fullPath.replace('//', '/')
    fullPath = fullPath.replace('\\\\', '\\')
    return new Promise((resolve, reject) => {
        fileExist(fullPath).then(() => {
            fs.unlink(fullPath, (err: any) => {
                if (!err) {
                    resolve('')
                } else {
                    reject(err)
                }
            });
        }).catch(() => {
            reject('not exist')
        })
    })
}


