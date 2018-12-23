<template lang="pug">
  tr
    BoardUserInfo.cell(:memberId="memberId" v-if="tasks")
    BoardUserTasks.cell(
      v-for="tasksOfWday,key in tasksOfWdays"
      :key="key"
      :tasks="tasksOfWday")
    BoardUserTasks.cell(:tasks="tasks.pendings" v-if="tasks")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { forEach } from 'lodash'
import BoardUserInfo from '~/components/atoms/BoardUserInfo.vue'
import BoardUserTasks from '~/components/molecules/BoardUserTasks.vue'
@Component({
  components: {
    BoardUserInfo,
    BoardUserTasks,
  },
})
export default class BoardUserTasksRow extends Vue {
  @Prop(String) memberId: string
  @Prop(Object) tasks
  @Prop({ type: Array, default: null })
  wdays: Array<number>
  get tasksOfWdays() {
    const tasksByWeekday: any = []
    if (this.tasks) {
      forEach(this.wdays, (wday: number) => {
        tasksByWeekday.push(this.tasks[wday])
      })
    }
    return tasksByWeekday
  }
}
</script>

<style scoped lang="sass">
.cell
  min-width: 200px
  word-break: break-all
  &:first-child
    font-weight: bold
    min-width: 128px
    text-align: center
  &:not(:last-child)
    border-right: 3px solid $border-color
</style>
