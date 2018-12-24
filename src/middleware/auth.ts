// import { auth, authenticator } from '~/plugins/firebase'
export default async ({ app, store, redirect }) => {
  let accessToken
  if (store.state.accessToken) {
    app.$cookies.set('sprintus-access-token', store.state.accessToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    accessToken = store.state.accessToken
  } else {
    accessToken = app.$cookies.get('sprintus-access-token')
  }
  if (!store.state.me.id && accessToken) {
    await store.dispatch('setMeById', accessToken)
  }
  const signedIn = Boolean(store.state.me.id)
  if (!signedIn) {
    redirect('/login')
  }
}
