import { ElNotification } from 'element-plus'
import { INotification } from 'element-plus/packages/notification/src/notification.type'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export function Notify (type: string, title: string, message: string): INotification {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return ElNotification[type]({
    title,
    message
  })
}

export interface LocalToken {
  expire: number;
  value: string;
}
/**
 * 校验 token 是否存在或已过期
 * */
export function verifyTokenExist (): boolean {
  const token: string | null = localStorage.getItem(ACCESS_TOKEN)
  const now = Date.now()
  // token 不存在
  if (!token) {
    return false
  } else {
    const parseToken: LocalToken = JSON.parse(token)
    if (parseToken.expire <= now) {
      // token 过期 => 移除
      localStorage.removeItem(ACCESS_TOKEN)
      return false
    }
    return true
  }
}
