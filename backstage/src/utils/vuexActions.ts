import { ActionContext, MutationPayload } from 'vuex'
import { RootState, StoreTypes } from '@/@types'

/**
 * commit mutation
 * @param {*} store
 * @param {*} type
 * @param {*} payload
 * */
export function commitMutation (store: ActionContext<StoreTypes, RootState>, type: string, payload: MutationPayload) {
  store.commit(type, payload)
}
