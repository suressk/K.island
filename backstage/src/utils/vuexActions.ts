import { ActionContext } from 'vuex'

// enum State {
//   String = 'String',
//   Number = 'Number',
//   Object = 'Object'
// }

/**
 * commit mutation
 * @param {*} store
 * @param {*} type
 * @param {*} state
 * */
export function commitMutation (store: ActionContext<any, any>, type: string, state: any) {
  store.commit(type, state)
}
