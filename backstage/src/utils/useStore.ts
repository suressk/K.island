import store from '@/store'
import { computed } from 'vue'

export function useState (...args: Array<string>) {
  const withNamespace = args.length === 2
  const name = withNamespace ? args[1] : args[0]
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const state = withNamespace ? store.state[args[0]] : store.state
  return computed(() => state[name])
}

export function useGetter (...args: Array<string>) {
  const withNamespace = args.length === 2
  const name = withNamespace ? args[0] + '/' + args[1] : args[0]
  return computed(() => store.getters[name])
}

export function useMutation (...args: Array<string>) {
  const withNamespace = args.length === 2
  const name = withNamespace ? args[0] + '/' + args[1] : args[0]
  return (payload: any) => {
    store.commit(name, payload)
  }
}

export function useAction (...args: Array<string>) {
  const withNamespace = args.length === 2
  const name = withNamespace ? args[0] + '/' + args[1] : args[0]
  return (payload: any) => {
    return store.dispatch(name, payload)
  }
}
