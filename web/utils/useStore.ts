import { computed } from '@nuxtjs/composition-api'
import { Store } from 'vuex'
// import * as store from '~/store'

export function useState (store: Store<any>, ...args: string[]) {
  const withNameSpace = args.length === 2
  const name = withNameSpace ? args[1] : args[0]

  const curState = withNameSpace ? store.state[args[0]] : store.state
  return computed(() => curState[name])
}
