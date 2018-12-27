
<template lang="pug">
  .modal(:class="{active: isActive}")
    .modal-overlay(aria-label="Close" @click="closeModal")
    .modal-container
      .modal-header
        .modal-title.h3 Taskの編集
          .delete-icon
            .i.fas.fa-trash-alt(@click="deleteTask")
      .modal-body
        .content
          .form-group
            label.form-label(for="edit-task-name") タイトル
            input.form-input#edit-task-name(type="text" placeholder="タイトル" v-model="editingTask.title")
          .form-group
            label.form-label(for="edit-task-description") 説明
            textarea.form-input#edit-task-description(type="text" placeholder="タイトル" v-model="editingTask.description")
          .form-group
            label.form-switch
              input(type="checkbox" v-model="editingTask.isCurrentWeek")
              i.form-icon
              span This Week
          .form-group
            span.input-group-addon Weekday
            select.form-select.select-lg.input_select(v-model="editingTask.weekday")
              option(v-for="wday in wdays" :value="wday.value" :key="wday.value") {{wday.text}}
      .modal-footer
        button.btn.btn-primary(@click="updateTask") {{buttonText}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class EditTaskModal extends Vue {
  @Prop(Boolean) isActive: boolean
  @Prop(Object) task
  @Action deleteTaskById
  @Action updateTaskById
  editingTask = {
    title: '',
    description: '',
    isCurrentWeek: true,
    weekday: null,
  }
  wdays: { text: string; value: number }[] = [
    { text: '日', value: 0 },
    { text: '月', value: 1 },
    { text: '火', value: 2 },
    { text: '水', value: 3 },
    { text: '木', value: 4 },
    { text: '金', value: 5 },
    { text: '土', value: 6 },
  ]
  created() {
    const defaultTask: any = {
      title: this.task.title,
      description: this.task.description,
      isCurrentWeek: this.task.isCurrentWeek,
      weekday: this.task.weekday,
    }
    this.editingTask = defaultTask
  }
  get buttonText() {
    return '更新'
  }
  async updateTask() {
    const updatingContents = {
      id: this.task.id,
      title: this.editingTask.title,
      description: this.editingTask.description,
      isCurrentWeek: this.editingTask.isCurrentWeek,
      weekday: this.editingTask.weekday,
    }
    await this.updateTaskById(updatingContents)
    this.closeModal()
  }
  async deleteTask() {
    await this.deleteTaskById(this.task.id)
    this.closeModal()
  }
  closeModal(): void {
    this.$emit('closeModal')
  }
}
</script>

<style scoped lang="sass">
.delete-icon
  display: inline-block
  float: right
</style>
