import { computed } from '@nuxtjs/composition-api'
// import * as store from '~/store'
import { Store } from 'vuex'

export function useState (curState: Store<any>, ...args: string[]) {
  const withNameSpace = args.length === 2
  const name = withNameSpace ? args[1] : args[0]

  // @ts-ignore
  const state = withNameSpace ? curState[args[0]] : curState
  return computed(() => state[name])
}
