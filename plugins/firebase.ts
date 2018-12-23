import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
if (!firebase.apps.length) {
  const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
  }
  firebase.initializeApp(config)
}
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const authenticator = function(): any {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      resolve(user || false)
    })
  })
}
export { firebase, db, auth, authenticator, provider }
