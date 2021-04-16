import {authPass, authEmail} from '../common/definition'
//
// interface SendMailOption {
//     origin: string
// }
//
// /**
//  * 发送邮件
//  * */
// export function sendMailInfo() {}

/**
 * QQ 邮箱
 * */
export const authMailInfo = {
    user: authEmail.qq,
    pass: authPass.qq,
    emailType: 'QQ',
    name: '小 K.'
}
