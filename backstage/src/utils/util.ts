import { ElNotification } from 'element-plus'
import { INotification } from 'element-plus/packages/notification/src/notification.type'

export function Notify (type: string, title: string, message: string): INotification {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return ElNotification[type]({
    title,
    message
  })
}
