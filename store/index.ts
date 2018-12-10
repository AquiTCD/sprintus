import { db } from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
// import { continueStatement } from 'babel-types'
import { orderBy } from 'lodash'
const usersRef = db.collection('users')
const organizationsRef = db.collection('organizations')
const teamsRef = db.collection('teams')
const monologuesRef = db.collection('monologues')
export const state = (): object => ({
  me: {
    id: 'uk9c9RcfPenLLiSCY1MX',
    name: 'currentUSer',
    avatar: '',
    preferences: {
      defaultMonologueRange: 'organization',
      defaultTaskRange: 'team',
    },
    labels: [
      {
        name: 'user_label',
        color: '#00ff00',
      },
    ],
    createdAt: '2018-12-07T00:00:00.000Z',
    updatedAt: '2018-12-08T12:30:00.000Z',
  },
  currentRange: {
    type: 'team',
    id: 'enli3dIfHv20kr3O5oPZ',
  },
  organizations: [
    {
      id: 'mT91Dcvq9SPyrK1bxemZ',
      administrators: ['uk9c9RcfPenLLiSCY1MX'],
      members: [],
      default_team_beggining_wday: 1,
      default_team_holiday_wdays: [0, 6],
      createdAt: '2018-12-07T00:00:00.000Z',
      updatedAt: '2018-12-08T12:30:00.000Z',
    },
  ],
  teams: [
    {
      id: 'enli3dIfHv20kr3O5oPZ',
      name: 'a-team',
      administrators: ['uk9c9RcfPenLLiSCY1MX'],
      members: [],
      followers: [],
      beggining_wday: 1,
      holiday_wdays: [0, 6],
      lables: [
        {
          name: 'team_label',
          color: '#ff0000',
        },
      ],
      createdAt: '2018-12-07T00:00:00.000Z',
      updatedAt: '2018-12-08T12:30:00.000Z',
    },
  ],
  users: [
    {
      id: 'uk9c9RcfPenLLiSCY1MX',
      name: 'a-user',
      preferences: {
        defaultMonologueRange: 'organization',
        defaultTaskRange: 'team',
      },
      labels: [
        {
          name: 'user_label',
          color: '#00ff00',
        },
      ],
      createdAt: '2018-12-07T00:00:00.000Z',
      updatedAt: '2018-12-08T12:30:00.000Z',
    },
  ],
  tasks: [
    {
      id: 'brG23RrTsPotVArHsxMG',
      title: 'task_title',
      description: 'task_description',
      user: 'uk9c9RcfPenLLiSCY1MX',
      range: 'enli3dIfHv20kr3O5oPZ',
      current_week: true,
      weekday: 2,
      labels: [
        {
          name: 'user_label',
          color: '#00ff00',
        },
      ],
      createdAt: '2018-12-07T00:00:00.000Z',
      updatedAt: '2018-12-08T12:30:00.000Z',
    },
  ],
  monologues: [
    {
      id: 'yc2Ayly5T13b8VhhWkWe',
      user: 'uk9c9RcfPenLLiSCY1MX',
      line: 'happy',
      createdAt: '2018-12-07T00:00:00.000Z',
      updatedAt: '2018-12-08T12:30:00.000Z',
    },
  ],
})

export const getters = {
  getMe(state) {
    return state.me
  },
  getTimelineEvents(state) {
    return orderBy(state.monologues, 'createdAt', 'desc')
  },
  getUsers(state) {
    return state.users
  },
  getTeam(state) {
    return state.teams[0]
  },
  getTasks(state) {
    return state.tasks
  },
}
export const mutations = {
  ...firebaseMutations,
}
export const actions = {
  setUsersRef: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('users', usersRef)
  }),
  setMonologuesRef: firebaseAction(({ bindFirebaseRef }) => {
    // teamsRef.doc(`${context.state.currentRange.id}`).collection('monologues')
    const ref = teamsRef.doc('enli3dIfHv20kr3O5oPZ').collection('monologues')
    bindFirebaseRef('monologues', ref)
  }),
  addMonologue: firebaseAction((context, line) => {
    const timestamp = new Date()
    const monologue = {
      user: {
        id: context.state.me.id,
        name: context.state.me.name,
        avatar: context.state.me.avatar,
      },
      line: line,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    let parentRef
    if (context.state.currentRange.type === 'organization') {
      parentRef = organizationsRef
    } else if (context.state.currentRange.type === 'team') {
      parentRef = teamsRef
    } else if (context.state.currentRange.type === 'users') {
      parentRef = usersRef
    }
    parentRef
      .doc(`${context.state.currentRange.id}`)
      .collection('monologues')
      .add(monologue)
  }),
}
