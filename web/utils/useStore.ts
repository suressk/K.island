import { computed } from '@nuxtjs/composition-api'
// import * as store from '~/store'
import { Store } from 'vuex'

export function useState (store: Store<any>, ...args: string[]) {
  const withNameSpace = args.length === 2
  const name = withNameSpace ? args[1] : args[0]

  const curState = withNameSpace ? store.state[args[0]] : store.state
  return computed(() => curState[name])
}
