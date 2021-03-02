import Vue from 'vue'
import Main from './main.vue'
import { AnyInstance } from '~/@types'

const KProgressConstructor = Vue.extend(Main)

const KProgress = () => {
  const instance = new KProgressConstructor() as AnyInstance
  instance.id = ''
  return  instance
}

export default KProgress
