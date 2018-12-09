<template lang="pug">
  div.the-board
    table.board
      thead
        BoardHeader(:wdays="wdays")
      tbody
        BoardMyTasks(
          :me="me"
          :wdays="wdays"
          :tasks="myTasks")
        //- BoardMemberTasks(
        //-   v-for="member in members"
        //-   :key="member.id"
        //-   :member="member"
        //-   :wdays="wdays")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardHeader from '~/components/molecules/BoardHeader.vue'
import BoardMyTasks from '~/components/molecules/BoardMyTasks.vue'
// import BoardMemberTasks from '~/components/molecules/BoardMemberTasks.vue'
import { forEach, filter, groupBy } from 'lodash'
@Component({
  components: {
    BoardHeader,
    BoardMyTasks,
    // BoardMemberTasks,
  },
})
export default class TheBoard extends Vue {
  @Prop(Number) beggining_wday: number
  @Prop(Array) holiday_wdays: Array<number>
  @Prop(Object) me
  @Prop(Array) tasks: Array<object>
  @Prop(Array) events: Array<object>
  get wdays() {
    const wdays: Array<number> = []
    for (let i = 0; i < 7; i++) {
      let wday: number = this.beggining_wday + i
      if (wday >= 7) {
        wday -= 7
      }
      if (this.holiday_wdays.some(holiday => holiday !== wday)) {
        wdays.push(wday)
      }
    }
    return wdays
  }
  get myTasks() {
    const myTasks = filter(this.tasks, { user: this.me.id })
    const myTasksWithWeek: Array<any> = []
    forEach(this.wdays, wday => {
      const task = filter(myTasks, { weekday: wday })
      myTasksWithWeek.push(task)
    })
    return myTasksWithWeek
  }
}
</script>

<style scoped lang="stylus">
.the-board,
.board
  width: 100%
</style>
