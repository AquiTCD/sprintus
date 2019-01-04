import * as functions from 'firebase-functions'
import { Nuxt } from 'nuxt'

const nuxt = new Nuxt({ buildDir: 'ssr', dev: false })

export const ssr = functions.https.onRequest(nuxt.render)
