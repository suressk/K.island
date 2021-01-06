import { Notify } from '@/utils/util'
import { addRecord } from '@/api/api'

import { RecordInfo } from '@/types/paramsType'

export function handleAddRecord (info: RecordInfo) {
  addRecord(info).then(res => {
    console.log(res)
    Notify('success', 'SUCCESS', '新增文章！')
  }).catch(err => {
    console.log(err)
  })
}
