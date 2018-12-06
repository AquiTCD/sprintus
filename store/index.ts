import { db } from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
const usersRef = db.collection('users')
export const state = (): object => ({
  users: [],
})

export const getters = {
  getUsers(state) {
    return state.users
  },
}
export const mutations = {
  ...firebaseMutations,
}
export const actions = {
  setUsersRef: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('users', usersRef)
  }),
}
