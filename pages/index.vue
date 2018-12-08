<template lang="pug">
  main.main
    TheTimeline.the-timeline(
      :me="me"
      :events="timelineEvents")
    TheBoard.the-board
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
  @Action setUsersRef
  created() {
    this.setUsersRef()
  }
  get me() {
    return this.getMe
  }
  get timelineEvents() {
    return this.getTimelineEvents
  }
  get users() {
    return this.getUsers
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
