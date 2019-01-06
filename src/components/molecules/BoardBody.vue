<template lang="pug">
  tbody
    BoardUserTasksRow.my-task(
      :memberId="me.id"
      :wdays="wdays"
      :tasks="myTasks")
    BoardUserTasksRow.member-task(
      v-for="(member,key,i) in memberTasks"
      :key="key"
      :memberId="key"
      :wdays="wdays"
      :tasks="member")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardUserTasksRow from '~/components/molecules/BoardUserTasksRow.vue'
import { forEach, omit, map, filter } from 'lodash'
@Component({
  components: {
    BoardUserTasksRow,
  },
})
export default class BoardBody extends Vue {
  @Prop(Object) me
  @Prop(Array) members: any[]
  @Prop(Array) tasks: any[]
  @Prop(Array) wdays: number[]
  get tasksByUser() {
    const tasksByUser = {}
    const memberIds = map(this.members, 'id')
    forEach(memberIds, memberId => {
      const userTasks = filter(this.tasks, { memberId: memberId })
      const tasksWithWeek: any = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        pendings: [],
      }
      forEach(userTasks, task => {
        if (task.isCurrentWeek && task.weekday < 7) {
          tasksWithWeek[task.weekday].push(task)
        } else {
          tasksWithWeek['pendings'].push(task)
        }
      })
      tasksByUser[memberId] = tasksWithWeek
    })
    return tasksByUser
  }
  get myTasks() {
    return this.tasksByUser[`${this.me.id}`]
  }
  get memberTasks() {
    return omit(this.tasksByUser, this.me.id)
  }
  indexToClass(i) {
    const count = Object.keys(this.memberTasks).length
    if (count > 1) {
      if (i === 0) {
        return 'first'
      } else if (i + 1 === count) {
        return 'last'
      }
    }
  }
}
</script>

<style scoped lang="sass">

</style>
