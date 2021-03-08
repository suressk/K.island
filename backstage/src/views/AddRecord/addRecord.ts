import { Notify } from '@/utils/util'
import { addRecord } from '@/api/api'

import { RecordInfo, ResponseData } from '@/@types'

export function handleAddRecord (info: RecordInfo) {
  /* eslint-disable */
  // @ts-ignore
  addRecord(info).then((res: ResponseData) => {
    if (res.success) {
      Notify('success', 'SUCCESS', res.message)
    } else {
      Notify('warning', 'WARNING', res.message)
    }
  }).catch(err => {
    Notify('success', 'SUCCESS', err.message)
  })
}
