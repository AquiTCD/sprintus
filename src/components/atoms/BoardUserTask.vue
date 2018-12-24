<template lang="pug">
  li.narrow
    label.form-checkbox.narrow
      input(type="checkbox" :checked="task.isDone" @change="toggleIsDone")
      i.form-icon
      span(:class="{done: task.isDone}") {{task.title}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class BoardUserTask extends Vue {
  @Action updateTaskById
  @Prop(Object) task
  toggleIsDone(): void {
    const updatingContents = {
      id: this.task.id,
      isDone: !this.task.isDone,
    }
    this.updateTaskById(updatingContents)
  }
}
</script>

<style scoped lang="sass">
.narrow
  margin-top: 0
  margin-bottom: 0
.done
  color: $gray-color-dark
  text-decoration-line: line-through
  text-decoration-color: $gray-color
</style>
