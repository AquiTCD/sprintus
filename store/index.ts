import { db } from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
const docsRef = db.collection('docs')
export const state = (): object => ({
  docs: [],
})

export const getters = {
  getDocs(state) {
    return state.docs
  },
}
export const mutations = {
  ...firebaseMutations,
}
export const actions = {
  setDocsRef: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('docs', docsRef)
  }),
}
