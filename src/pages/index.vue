<template lang="pug">
  main.main
    TheTimeline.the-timeline(
      :events="timelineEvents")
    TheBoard.the-board(
      :holidayWeekdays="holidayWeekdays"
      :begginingWeekday="begginingWeekday"
      :tasks="tasks"
      :me="me"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import { db } from '~/plugins/firebase'
import TheTimeline from '~/components/organisms/TheTimeline.vue'
import TheBoard from '~/components/organisms/TheBoard.vue'
@Component({
  components: {
    TheTimeline,
    TheBoard,
  },
  layout: 'withFooter',
  middleware: 'auth',
})
export default class extends Vue {
  @Getter getMe
  @Getter getUsers
  @Getter getTimelineEvents
  @Getter getTeam
  @Getter getTasks
  @Action setMonologuesRef
  @Action setTasksRef
  async fetch({ store }) {
    await store.dispatch('setUsersRef', store.state.currentPerspective)
    await store.dispatch('setMonologuesRef', store.state.currentPerspective)
    await store.dispatch('setTasksRef', store.state.currentPerspective)
  }
  get me() {
    return this.getMe
  }
  get timelineEvents() {
    return this.getTimelineEvents
  }
  get team() {
    return this.getTeam
  }
  get users() {
    return this.getUsers
  }
  get begginingWeekday() {
    return this.team.begginingWeekday
  }
  get holidayWeekdays() {
    return this.team.holidayWeekdays
  }
  get tasks() {
    return this.getTasks
  }
}
</script>

<style scoped lang="sass">
.main
  padding-top: 50px
  padding-bottom: 50px
  display: flex
  height: 100vh
  overflow-y: scroll
.the-timeline
  border-right: $border-color 5px solid
  height: 100%
  overflow-y: scroll
  width: 256px
  min-width: 256px
.the-board
  overflow-x: scroll
</style>
