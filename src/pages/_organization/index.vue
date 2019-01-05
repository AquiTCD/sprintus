<template lang="pug">
  main.main
    TheTimeline.the-timeline(
      :events="timelineEvents")
    TheBoard.the-board(
      :holidayWeekdays="holidayWeekdays"
      :begginingWeekday="begginingWeekday"
      :members="members"
      :tasks="tasks"
      :me="me"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import TheTimeline from '~/components/organisms/TheTimeline.vue'
import TheBoard from '~/components/organisms/TheBoard.vue'
@Component({
  components: {
    TheTimeline,
    TheBoard,
  },
  layout: 'withFooter',
  middleware: ['auth', 'info'],
})
export default class extends Vue {
  @Getter getCurrentOrganization
  // @Getter getCurrentTeam
  @Getter getTeams
  @Getter getMembers
  @Getter getMe
  @Getter getTimelineEvents
  @Getter getTasks
  @Action setMonologuesRef
  @Action setTasksRef
  params = null
  async asyncData({ params }) {
    return { params: params }
  }
  async created() {
    await this.$store.dispatch('setCurrentOrganizationRef', this.params)
    // await this.$store.dispatch('setCurerntTeamRef', this.params)
    await this.$store.dispatch('setTeamsRef', this.params)
    await this.$store.dispatch('setMembersRef', this.params)
    await this.$store.dispatch('setMonologuesRef', this.params)
    await this.$store.dispatch('setTasksRef', this.params)
  }
  get organization() {
    return this.getCurrentOrganization
  }
  get members() {
    return this.getMembers
  }
  get me() {
    return this.getMe
  }
  get timelineEvents() {
    return this.getTimelineEvents
  }
  get tasks() {
    return this.getTasks
  }
  // get team() {
  //   return this.getCurrentTeam
  // }
  get teams() {
    return this.getTeams
  }
  get begginingWeekday() {
    return this.$store.state.currentOrganization.begginingWeekday
  }
  get holidayWeekdays() {
    return this.$store.state.currentOrganization.holidayWeekdays
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
  background-color: $twill
.the-timeline
  height: 100%
  overflow-y: scroll
  width: 256px
  min-width: 256px
.the-board
  width: 100%
  overflow-x: scroll
</style>
