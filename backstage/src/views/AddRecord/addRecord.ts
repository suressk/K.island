import { Notify } from '@/utils/util'

export function handleAddRecord (info: object) {
  Notify('success', 'SUCCESS', '新增文章！')
  console.log(info)
}
