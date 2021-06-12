export const origin = 'origin'

export const SERVER_ORIGIN = 'server-origin'

// 邮箱授权码
export const authPass = {
    qq: 'xxx',
    outlook: 'yyy'
}

export const authEmail = {
    qq: 'sure_k@qq.com',
    outlook: 'sure_ssk@outlook.com'
}

export const mailService = {
    qq: 'QQ',
    163: '163',
    gmail: 'Gmail',
    outlook: 'Outlook365'
}

/**
 * QQ 邮箱
 * */
export const authorMailInfo = {
    user: authEmail.qq,
    pass: authPass.qq,
    emailType: mailService.qq,
    name: '小K.'
}

/**
 * 随机字符串作 jwt 加密秘钥
 * */
export const CERT = ``
