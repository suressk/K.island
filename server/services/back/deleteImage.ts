import fs from 'fs'
import path from 'path'

function resolvePath (dir: string, filename: string) {
    return path.join(__dirname, '../../', dir, filename)
}

export function deleteImage (dir: string, filename: string) {
    let fullPath = resolvePath(dir, filename)
    fullPath = fullPath.replace('//', '/')
    fullPath = fullPath.replace('\\\\', '\\')
    return new Promise((resolve, reject) => {
        fs.unlink(fullPath, err => {
            if (!err) {
                resolve('success')
            } else {
                reject(err)
            }
        });
    })

}


