<template lang="pug">
  div.the-board
    table.board
      thead
        BoardHeader(:wdays="wdays")
      tbody
        BoardMyTasks.member(
          :me="me"
          :wdays="wdays"
          :tasks="myTasks")
        //- BoardMemberTasks(
        //-   v-for="member in members"
        //-   :key="member.id"
        //-   :member="member"
        //-   :wdays="wdays")
          vs-sidebar(position-right  parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active")
    vs-button.new-task_btn(@click="open" color="secondary" type="filled" icon="add_box") New Task
    vs-popup(classContent="popup-example"  title="Lorem ipsum dolor sit amet" :active.sync="active")
      h4 Add New Task
    vs-input(label="Title" placeholder="Placeholder" v-model="title")
    vs-textarea(label="Description" v-model="descrition")
    //- vs-select(label="Weekday" v-model="selected")
      vs-select-item(v-for="item,index in weekdaySelection"
        :key="index"
        :value="item.value"
        :text="item.text")
      //- vs-select(placeholder="Search and select"
        label="Labels"
        label-placeholder="Labels"
        multiple
        autocomplete
        v-model="labels")
        vs-select-item(v-for="item,index in labelSelection"
          :key="index"
          :value="item.value"
          :text="item.text")
      vs-button.new-task-post_btn(color="secondary" type="filled" icon="add_box") Post New Task
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardHeader from '~/components/molecules/BoardHeader.vue'
import BoardMyTasks from '~/components/molecules/BoardMyTasks.vue'
// import BoardMemberTasks from '~/components/molecules/BoardMemberTasks.vue'
import { forEach, filter, groupBy, difference } from 'lodash'
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
  active = false
  selected = 0
  labels = []
  title = ''
  descrition = ''
  weekdaySelection = [
    { text: '日', value: 0 },
    { text: '月', value: 1 },
    { text: '火', value: 2 },
    { text: '水', value: 3 },
    { text: '木', value: 4 },
    { text: '金', value: 5 },
    { text: '土', value: 6 },
  ]
  labelSelection = [
    { text: 'Aproj', value: 'aaa' },
    { text: 'Bproj', value: 'bbb' },
    { text: 'Cproj', value: 'ccc' },
  ]
  open() {
    this.active = true
  }
  get wdays() {
    const wdays: Array<number> = []
    for (let i = 0; i < 7; i++) {
      let wday: number = this.beggining_wday + i
      if (wday >= 7) {
        wday -= 7
      }
      wdays.push(wday)
    }
    return difference(wdays, this.holiday_wdays)
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
.member
  border-bottom: 2px solid #ccc
</style>
