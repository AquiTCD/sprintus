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
  middleware: ['auth', 'info', 'ensureJoined'],
})
export default class extends Vue {
  @Getter getCurrentOrganization
  @Getter getCurrentTeam
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
    await this.$store.dispatch('setCurrentTeamRef', this.params)
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
  get teams() {
    return this.getTeams
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
  get team() {
    return this.getCurrentTeam
  }
  get begginingWeekday() {
    if (this.$store.state.currentTeam.isOrganizationWeekday) {
      return this.$store.state.currentOrganization.begginingWeekday
    } else {
      return this.$store.state.currentTeam.begginingWeekday
    }
  }
  get holidayWeekdays() {
    if (this.$store.state.currentTeam.isOrganizationHolidays) {
      return this.$store.state.currentOrganization.holidayWeekdays
    } else {
      return this.$store.state.currentTeam.holidayWeekdays
    }
  }
}
</script>

<style scoped lang="sass">
.main
  display: flex
.the-timeline
  height: 100%
  overflow-y: scroll
  width: 256px
  min-width: 256px
.the-board
  width: 100%
  overflow-x: scroll
</style>
