<template lang="pug">
  li.narrow
    label.form-checkbox.narrow(@click.self.prevent.stop)
      input(type="checkbox" :checked="task.isDone" @click.prevent="toggleIsDone")
      i.form-icon
      span(:class="{done: task.isDone}" @click.prevent="openEditTaskModal") {{task.title}}
    EditTaskModal(:task="task" :isActive="isEditingTask" @closeModal="closeEditTaskModal")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import EditTaskModal from '~/components/atoms/EditTaskModal.vue'
@Component({
  components: {
    EditTaskModal,
  },
})
export default class BoardUserTask extends Vue {
  @Action updateTaskById
  @Prop(Object) task
  isEditingTask: boolean = false
  get isMine(): boolean {
    return this.task.memberId === this.$store.state.me.id
  }
  toggleIsDone(): void {
    if (this.isMine) {
      const updatingContents = {
        id: this.task.id,
        isDone: !this.task.isDone,
      }
      this.updateTaskById(updatingContents)
    }
  }
  openEditTaskModal(): void {
    if (this.isMine) {
      this.isEditingTask = true
    }
  }
  closeEditTaskModal(): void {
    this.isEditingTask = false
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
