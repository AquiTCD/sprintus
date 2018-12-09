<template lang="pug">
  main.main
    TheTimeline.the-timeline(
      :me="me"
      :events="timelineEvents")
    TheBoard.the-board(
      :holiday_wdays="holiday_wdays"
      :beggining_wday="beggining_wday"
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
})
export default class extends Vue {
  @Getter getMe
  @Getter getUsers
  @Getter getTimelineEvents
  @Getter getTeam
  @Getter getTasks
  @Action setUsersRef
  @Action setMonologuesRef
  created() {
    this.setUsersRef()
    this.setMonologuesRef()
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
  get beggining_wday() {
    return this.team.beggining_wday
  }
  get holiday_wdays() {
    return this.team.holiday_wdays
  }
  get tasks() {
    return this.getTasks
  }
}
</script>

<style scoped lang="stylus">
.main
  display: flex
  height: 100vh
.the-timeline
  border-right: $grey-tint 5px solid
  height: 100%
  width: 256px
</style>
