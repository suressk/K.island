import { TokenInfo } from '@/types'
import { STORAGE_PREFIX } from '@/types/constant'

// LocalStorage 操作
/**
 * @description localStorage 存储一项
 * @author Saul
 * @date 14/09/2021
 * @export
 * @template V
 * @param {string} name item key
 * @param {V} value item value
 * @param {number} expired expired time
 */
export function setStorageItem<V>(name: string, value: V, expired: number): void {
  const KEY = STORAGE_PREFIX + name
  localStorage.setItem(KEY, JSON.stringify(value))
  expired && localStorage.setItem(`${KEY}_expired`, JSON.stringify(value))
}

export function getStorageItem<V>(name: string): null | V {
  const KEY = STORAGE_PREFIX + name
  const value = localStorage.getItem(KEY)
  if (value !== null) {
    return JSON.parse(value) as V
  }
  return null
}