<template lang="pug">
  tr
    BoardUserInfo.cell(:me="me")
    BoardUserTasks.cell(
      v-for="tasksOfWday in tasksOfWdays"
      :tasks="tasksOfWday"
    )
    BoardUserTasks.cell(
      :tasks="pendingTasks"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardUserInfo from '~/components/atoms/BoardUserInfo.vue'
import BoardUserTasks from '~/components/molecules/BoardUserTasks.vue'
@Component({
  components: {
    BoardUserInfo,
    BoardUserTasks,
  },
})
export default class BoardMyTasks extends Vue {
  @Prop(Object) me: object
  @Prop(Array) tasks: Array<object>
  get tasksOfWdays() {
    return this.tasks
  }
  get pendingTasks() {
    return null
  }
}
</script>

<style scoped lang="stylus">
.cell
  min-width: 200px
  word-break: break-all
  &:first-child
    font-weight: bold
    min-width: 128px
    text-align: center
  &:not(:last-child)
    border-right: 3px solid #ccc
</style>
