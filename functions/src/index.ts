import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Nuxt } from 'nuxt'

const nuxt = new Nuxt({ buildDir: 'ssr', dev: false })
export const ssr = functions.https.onRequest(nuxt.render)

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

export const updateTasksByDay = functions.https.onRequest((req, res) => {
  const date = new Date()
  const jstDate = date
  jstDate.setHours(jstDate.getHours() - 9) // JST
  const dayOfWeek = jstDate.getDay()
  const organizationsRef = db.collection('organizations')
  const organizationIds: string[] = []
  const targetTaskIds: string[] = []
  const batch = db.batch()
  organizationsRef
    .where('begginingWeekday', '==', dayOfWeek)
    .get()
    .then(organizations => {
      organizations.forEach(doc => {
        organizationIds.push(doc.id)
      })
    })
    .then(() => {
      organizationIds.forEach(id => {
        organizationsRef
          .doc(id)
          .collection('tasks')
          .where('isDone', '==', true)
          .get()
          .then(tasks => {
            tasks.forEach(doc => {
              targetTaskIds.push(doc.id)
              const taskRef = organizationsRef
                .doc(id)
                .collection('tasks')
                .doc(doc.id)
              batch.delete(taskRef)
            })
          })
          .catch(function(error) {
            res.status(500).send('task updating failed on deleting done tasks')
          })
        const updatingTask = {
          weekday: dayOfWeek,
          updatedAt: date,
        }
        organizationsRef
          .doc(id)
          .collection('tasks')
          .where('isDone', '==', false)
          .get()
          .then(tasks => {
            tasks.forEach(doc => {
              targetTaskIds.push(doc.id)
              const taskRef = organizationsRef
                .doc(id)
                .collection('tasks')
                .doc(doc.id)
              batch.update(taskRef, updatingTask)
            })
          })
          .catch(function(error) {
            res.status(500).send('task updating failed on updating pendings')
          })
          .then(() => {
            batch.commit()
            res.status(200).send('task updating succeeded')
          })
      })
    })
    .catch(function(error) {
      res.status(500).send('task updating failed on getting organizations')
    })
})
