import { firebase, db } from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { find, orderBy, filter, forEach, includes, map } from 'lodash'
import { templateElement } from 'babel-types'
const usersRef = db.collection('users')
const organizationsRef = db.collection('organizations')

export interface User {
  id?: string;
  preferences: {
    default: {
      postType: 'task' | 'monologue' | 'latest';
      ranges: {
        monologue: 'organization' | 'team' | 'me' | 'latest';
        task: 'organization' | 'team' | 'me' | 'latest';
      };
      path: {
        organizationId: string;
        teamId: string;
      };
    };
    labels: null | Label[];
  };
  latest: {
    postType: 'task' | 'monologue';
    range: {
      monologue: 'organization' | 'team' | 'me';
      task: 'organization' | 'team' | 'me';
    };
  };
  organizationIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Member {
  id?: string;
  userRef?: any;
  name: string;
  avatarUrl: string;
  teamIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Me extends User {
  id: string;
  name: string;
  avatarUrl: string;
  teamsIds: string[];
}
export const enum Weekday {
  sun,
  mon,
  tue,
  wed,
  thu,
  fri,
  sat,
}
export interface Label {
  name: string;
  color: string;
}
export interface Organization {
  id?: string;
  name: string;
  administratorIds: string[];
  members?: Member[];
  pendings: {
    administratorIds: string[];
    memberIds: string[];
  };
  requiresApproval: boolean;
  begginingWeekday: Weekday;
  holidayWeekdays: Weekday[];
  tasks?: Task[];
  monologues?: Monologue[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Team {
  id?: string;
  name: string;
  administratorIds: string[];
  memberIds: string[];
  pendings: {
    administratorIds: string[];
    memberIds: string[];
  };
  requiresApproval: boolean;
  isOrganizationWeekday: boolean;
  begginingWeekday: Weekday;
  isOrganizationHolidays: boolean;
  holidayWeekdays: Weekday[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Task {
  id?: string;
  title: string;
  description: null | string;
  memberId: string;
  teamId: string;
  range: 'organization' | 'team' | 'me';
  isCurrentWeek: boolean;
  weekday: null | Weekday;
  labels: null | Label[];
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Monologue {
  id?: string;
  memberId: string;
  teamId: string;
  range: 'organization' | 'team' | 'me';
  line: string;
  createdAt: Date;
  updatedAt: Date;
}
export const state = (): object => ({
  accessToken: '',
  me: {
    id: '',
    name: '',
    avatarUrl: '',
    tasks: [],
    monologues: [],
    preferences: {
      default: {
        postTyf: 'monologue',
        ranges: {
          monologue: 'team',
          task: 'team',
        },
        path: {
          organizationId: '',
          teamId: '',
        },
      },
      labels: [],
    },
    latest: {
      postType: 'monologue',
      range: {
        monologue: 'team',
        task: 'team',
      },
    },
    organizationIds: [],
    createdAt: '',
    updatedAt: '',
  },
  currentParams: {
    organization: '',
    team: '',
  },
  currentOrganization: null,
  currentTeam: null,
  teams: [],
  members: [],
  tasks: [],
  monologues: [],
})

export const getters = {
  isAuthenticated(state) {
    return !!state.me.id
  },
  getDefaultPath(state) {
    let path
    try {
      path = `${state.me.preferences.default.path.organizationId}/`
      if (state.me.preferences.default.path.teamId) {
        path += `${state.me.preferences.default.path.teamId}/`
      }
    } catch (e) {
      path = ''
    }
    return path
  },
  getCurrentOrganizationName(state) {
    if (state.currentOrganization) {
      if (state.currentOrganization.name) {
        return state.currentOrganization.name
      } else {
        return state.currentParams.organization
      }
    } else {
      return ''
    }
  },
  getCurrentTeamName(state) {
    if (state.currentParams.team) {
      if (state.currentTeam.name) {
        return state.currentTeam.name
      } else {
        return state.currentParams.team
      }
    } else {
      return ''
    }
  },
  getMe(state) {
    return state.me
  },
  getTimelineEvents(state) {
    let scopedEvents: any[] = []
    if (state.currentParams.team) {
      const teamEvents = filter(state.monologues, {
        range: 'team',
        teamId: state.currentParams.team,
      })
      scopedEvents = scopedEvents.concat(teamEvents)
    } else {
      const teamIds = state.me.teamIds
      forEach(teamIds, id => {
        const teamEvents = filter(state.monologues, {
          range: 'team',
          teamId: id,
        })
        scopedEvents = scopedEvents.concat(teamEvents)
      })
      const orgEvents = filter(state.monologues, { range: 'organization' })
      scopedEvents = scopedEvents.concat(orgEvents)
    }
    const myEvents = filter(state.monologues, {
      range: 'me',
      memberId: state.me.id,
    })
    scopedEvents = scopedEvents.concat(myEvents)
    return orderBy(scopedEvents, 'createdAt', 'desc')
  },
  getCurrentOrganization(state) {
    return state.currentOrganization
  },
  getMembers(state) {
    if (state.currentParams.team) {
      const teamMembers: any = []
      forEach(state.currentTeam.memberIds, id => {
        const member = find(state.members, { id: id })
        teamMembers.push(member)
      })
      return teamMembers
    } else {
      return state.members
    }
  },
  getTeams(state) {
    return state.teams
  },
  getTeamPathWithNames(state) {
    const teams: any = []
    forEach(state.teams, team => {
      const obj = {
        path: `/${state.currentParams.organization}/${team.id}`,
        name: team.name,
      }
      teams.push(obj)
    })
    return teams
  },
  getCurrentTeam(state) {
    return state.currentTeam
  },
  getCurrentParams(state) {
    return state.currentParams
  },
  getTasks(state) {
    let scopedTasks: any[] = []
    if (state.currentParams.team) {
      const teamTasks = filter(state.tasks, {
        range: 'team',
        teamId: state.currentParams.team,
      })
      scopedTasks = scopedTasks.concat(teamTasks)
    } else {
      const teamIds = state.me.teamIds
      forEach(teamIds, id => {
        const teamTasks = filter(state.tasks, { range: 'team', teamId: id })
        scopedTasks = scopedTasks.concat(teamTasks)
      })
      const orgTasks = filter(state.tasks, { range: 'organization' })
      scopedTasks = scopedTasks.concat(orgTasks)
    }
    const myTasks = filter(state.tasks, { range: 'me', memberId: state.me.id })
    scopedTasks = scopedTasks.concat(myTasks)
    return orderBy(scopedTasks, 'createdAt', 'desc')
  },
  getMemberById: state => id => {
    const foundUser = find(state.members, { id: id })
    if (foundUser) {
      return foundUser
    } else {
      const unknownUser: Member = {
        id: 'UNKNOWN',
        name: 'UNKNOWN',
        avatarUrl: '',
        teamIds: [],
      }
      return unknownUser
    }
  },
  getHasOrganizationPermission(state) {
    try {
      return includes(state.currentOrganization.administratorIds, state.me.id)
    } catch (e) {
      return false
    }
  },
  getHasTeamPermission(state) {
    if (state.currentTeam) {
      return includes(state.currentTeam.administratorIds, state.me.id)
    } else {
      return false
    }
  },
}
export const mutations = {
  setMe(state, user) {
    state.me = {
      ...state.me,
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
      preferences: user.preferences,
      latest: user.latest,
      organizationIds: user.organizationIds,
      teamIds: user.teamIds,
      createdAt: user.createdAt,
      updatedAt: user.avatarUrl,
    }
  },
  updateMeAsMember(state, member) {
    state.me.name = member.name
    state.me.avatarUrl = member.avatarUrl
    state.me.teamIds = member.teamIds
  },
  setCurrentOrganization(state, currentOrganization) {
    state.currentOrganization = currentOrganization
  },
  setCurrentTeam(state, currentTeam) {
    state.currentTeam = currentTeam
  },
  setCurrentParams(state, currentParams) {
    state.currentParams = currentParams
  },
  setAccessToken(state, token) {
    state.accessToken = token
  },
  ...firebaseMutations,
}
export const actions = {
  setCurrentOrganizationRef: firebaseAction(({ bindFirebaseRef }, params) => {
    const ref = organizationsRef.doc(params.organization)
    bindFirebaseRef('currentOrganization', ref)
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  }),
  setCurrentTeamRef: firebaseAction(({ bindFirebaseRef }, params) => {
    const ref = organizationsRef.doc(params.organization)
    bindFirebaseRef('currentTeam', ref.collection('teams').doc(params.team))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  }),
  setTeamsRef: firebaseAction(({ bindFirebaseRef }, params) => {
    const ref = organizationsRef.doc(params.organization)
    bindFirebaseRef('teams', ref.collection('teams'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  }),
  setMembersRef: firebaseAction(({ bindFirebaseRef }, params) => {
    const ref = organizationsRef.doc(params.organization)
    bindFirebaseRef('members', ref.collection('members'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  }),
  setMonologuesRef: firebaseAction(({ bindFirebaseRef }, params) => {
    const ref = organizationsRef.doc(params.organization)
    bindFirebaseRef('monologues', ref.collection('monologues'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  }),
  setTasksRef: firebaseAction(({ bindFirebaseRef }, params) => {
    const ref = organizationsRef.doc(params.organization)
    bindFirebaseRef('tasks', ref.collection('tasks'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  }),
  async createOrFindUser({ commit, dispatch }, userInfo) {
    const doc = await usersRef.doc(userInfo.uid).get()
    if (!doc.exists) {
      await dispatch('addNewUser', userInfo)
    }
    await dispatch('setMeById', userInfo.uid)
  },
  async setMeById({ commit }, id) {
    const user: any = await usersRef.doc(id).get()
    const member = {
      name: '',
      avatarUrl: '',
      teamIds: [],
    }
    const userData = await user.data()
    const me = {
      id: id,
      name: member.name,
      avatarUrl: member.avatarUrl,
      preferences: userData.preferences,
      latest: userData.latest,
      organizationIds: userData.organizationIds,
      teamIds: member.teamIds,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    }
    commit('setMe', me)
  },
  async setMeAsMember({ state, commit }, organizationId) {
    let memberData
    if (!state.me.name) {
      const member: any = await organizationsRef
        .doc(organizationId)
        .collection('members')
        .doc(state.me.id)
        .get()
      memberData = await member.data()
    } else {
      memberData = find(state.members, { id: state.me.id })
    }
    const foundMember = {
      name: memberData.name,
      avatarUrl: memberData.avatarUrl,
      teamIds: memberData.teamIds,
    }
    commit('updateMeAsMember', foundMember)
  },
  async updateCurrent({ state, commit }, params) {
    const currentParams = {
      organization: '',
      team: '',
    }
    if (params.organization) {
      if (!state.currentParams.organization || !state.currentOraganization) {
        const orgData: any = await organizationsRef
          .doc(params.organization)
          .get()
        const org: any = await orgData.data()
        commit('setCurrentOrganization', org)
      }
      currentParams.organization = params.organization
    }
    if (params.team) {
      if (!state.currentParams.params || !state.currentTeam) {
        const teamData: any = await organizationsRef
          .doc(params.organization)
          .collection('teams')
          .doc(params.team)
          .get()
        const team: any = await teamData.data()
        commit('setCurrentTeam', team)
      }
      currentParams.team = params.team
    }
    commit('setCurrentParams', currentParams)
  },
  async saveAccessToken({ commit }, accessToken: string) {
    commit('setAccessToken', accessToken)
  },
  async addMonologue(context, newMonologue) {
    const timestamp = new Date()
    const monologue: Monologue = {
      memberId: context.state.me.id,
      teamId: context.state.currentParams.team,
      range: newMonologue.range,
      line: newMonologue.line,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    const ref = organizationsRef.doc(context.state.currentParams.organization)
    ref.collection('monologues').add(monologue)
  },
  async deleteMonologue(context, id) {
    const ref = organizationsRef.doc(context.state.currentParams.organization)
    ref
      .collection('monologues')
      .doc(id)
      .delete()
  },
  async addTask(context, newTask) {
    const timestamp = new Date()
    const task: Task = {
      title: newTask.title,
      description: newTask.description,
      memberId: context.state.me.id,
      teamId: context.state.currentParams.team,
      range: newTask.range,
      isCurrentWeek: newTask.isCurrentWeek,
      weekday: newTask.weekday,
      labels: [],
      isDone: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    const ref = organizationsRef.doc(context.state.currentParams.organization)
    ref.collection('tasks').add(task)
  },
  async updateTaskById(context, updatingContents: Task) {
    const timestamp = new Date()
    updatingContents.updatedAt = timestamp
    const ref = organizationsRef.doc(context.state.currentParams.organization)
    ref
      .collection('tasks')
      .doc(updatingContents.id)
      .update(updatingContents)
  },
  async deleteTaskById(context, id) {
    const timestamp = new Date()
    const ref = organizationsRef.doc(context.state.currentParams.organization)
    ref
      .collection('tasks')
      .doc(id)
      .delete()
  },
  async addNewUser(context, userInfo) {
    const timestamp = new Date()
    const user: User = {
      preferences: {
        default: {
          postType: 'monologue',
          ranges: {
            monologue: 'team',
            task: 'team',
          },
          path: {
            organizationId: '',
            teamId: '',
          },
        },
        labels: [],
      },
      latest: {
        postType: 'monologue',
        range: {
          monologue: 'team',
          task: 'team',
        },
      },
      organizationIds: [],
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    usersRef.doc(userInfo.uid).set(user)
  },
  async addOrganization(context, user) {
    const timestamp = new Date()
    const organization: Organization = {
      name: user.organizationId,
      administratorIds: [user.id],
      pendings: {
        administratorIds: [],
        memberIds: [],
      },
      requiresApproval: false,
      tasks: [],
      monologues: [],
      begginingWeekday: Weekday.mon,
      holidayWeekdays: [Weekday.sat, Weekday.sun],
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    await organizationsRef.doc(user.organizationId).set(organization)
    context.dispatch('joinToOrganization', user)
  },
  async joinToOrganization(context, user) {
    const timestamp = new Date()
    const org = organizationsRef.doc(user.organizationId)
    const doc = await org.get()
    if (doc.exists) {
      const member = {
        userRef: usersRef.doc(user.id),
        name: user.name,
        avatarUrl: user.avatarUrl,
        teamIds: [],
        tasks: [],
        monologues: [],
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      await org
        .collection('members')
        .doc(user.id)
        .set(member)
      await org.update({ updatedAt: timestamp })
    } else {
      throw new Error('organization does not exist')
    }
  },
  async updateOrganization(context, updatingContents: Organization) {
    const timestamp = new Date()
    updatingContents.updatedAt = timestamp
    organizationsRef.doc(updatingContents.id).update(updatingContents)
  },
  async addNewTeam({ state }, team) {
    const teamRef = organizationsRef
      .doc(state.currentParams.organization)
      .collection('teams')
    const doc = await teamRef.doc(team.id).get()
    if (doc.exists) {
      throw new Error('team already exist')
    } else {
      const timestamp = new Date()
      const choise = {
        begginingWeekday: 1,
        holidayWeekdays: [],
      }
      if (team.isOrganizationWeekday) {
        choise.begginingWeekday = state.currentOrganization.begginingWeekday
      } else {
        choise.begginingWeekday = team.begginingWeekday
      }
      if (team.isOrganizationHolidays) {
        choise.holidayWeekdays = state.currentOrganization.holidayWeekdays
      } else {
        choise.holidayWeekdays = team.holidayWeekdays
      }
      const teamName = team.name ? team.name : team.id
      const newTeam: Team = {
        name: teamName,
        administratorIds: [state.me.id],
        memberIds: [state.me.id],
        pendings: {
          administratorIds: [],
          memberIds: [],
        },
        requiresApproval: team.requiresApproval,
        isOrganizationWeekday: team.isOrganizationWeekday,
        begginingWeekday: choise.begginingWeekday,
        isOrganizationHolidays: team.isOrganizationHolidays,
        holidayWeekdays: choise.holidayWeekdays,
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      await teamRef.doc(team.id).set(newTeam)
      return
    }
  },
  async updateTeam(context, updatingContents: User) {
    const timestamp = new Date()
    updatingContents.updatedAt = timestamp
    organizationsRef
      .doc(context.state.currentParams.organization)
      .collection('teams')
      .doc(context.state.currentParams.team)
      .update(updatingContents)
  },
  async joinToTeam(context, teamId: string) {
    await context.dispatch('addMemberToTeam', teamId)
    await context.dispatch('addTeamToMember', teamId)
    return
  },
  async addMemberToTeam(context, teamId: string) {
    const timestamp = new Date()
    const teamRef = organizationsRef
      .doc(context.state.currentParams.organization)
      .collection('teams')
      .doc(teamId)
    teamRef.update({
      memberIds: firebase.firestore.FieldValue.arrayUnion(context.state.me.id),
      updatedAt: timestamp,
    })
    return
  },
  async addTeamToMember(context, teamId: string) {
    const timestamp = new Date()
    const memberRef = organizationsRef
      .doc(context.state.currentParams.organization)
      .collection('members')
      .doc(context.state.me.id)
    memberRef.update({
      teamIds: firebase.firestore.FieldValue.arrayUnion(teamId),
      updatedAt: timestamp,
    })
    return
  },
  async addOrganizationToUser(context, organizatinId: string) {
    const timestamp = new Date()
    const userRef = usersRef.doc(context.state.me.id)
    userRef.update({
      organizationIds: firebase.firestore.FieldValue.arrayUnion(organizatinId),
      updatedAt: timestamp,
    })
  },
  async updateUser(context, updatingContents: User) {
    const timestamp = new Date()
    updatingContents.updatedAt = timestamp
    usersRef.doc(updatingContents.id).update(updatingContents)
  },
  async updateMember(context, updatingContents: Member) {
    const timestamp = new Date()
    const memberRef = organizationsRef
      .doc(context.state.currentParams.organization)
      .collection('members')
      .doc(context.state.me.id)
    memberRef.update(updatingContents)
  },
  async addPendingAdministratorIdToOrganization(context) {
    const timestamp = new Date()
    const ref = organizationsRef.doc(context.state.currentParams.organization)
    ref.update({
      'pendings.administratorIds': firebase.firestore.FieldValue.arrayUnion(
        context.state.me.id
      ),
      updatedAt: timestamp,
    })
  },
  async addPendingAdministratorIdToTeam(context) {
    const timestamp = new Date()
    const ref = organizationsRef
      .doc(context.state.currentParams.organization)
      .collection('teams')
      .doc(context.state.currentParams.team)
    ref.update({
      'pendings.administratorIds': firebase.firestore.FieldValue.arrayUnion(
        context.state.me.id
      ),
      updatedAt: timestamp,
    })
  },
}
