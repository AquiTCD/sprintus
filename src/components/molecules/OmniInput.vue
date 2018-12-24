<template lang="pug">
  .omni-input
    .input-group
      select.form-select.select-lg.input_select(v-model="selectedType")
        option(v-for="typeOption in typeOptions" :value="typeOption.value" :key="typeOption.value") {{typeOption.text}}
      select.form-select.select-lg.input_select(v-model="selectedRange")
        option(v-for="option in currentRangeOptions" :value="option.value" :key="option.value") {{option.text}}
      input.form-input.input-lg.input_text(type="text" placeholder="task/monologue" v-model="content")
      button(v-if="!taskFormExpanded").btn.btn-primary.input-group-btn.btn-lg.input_btn(@click="post") Post
    .form-horizontal(v-if="taskFormExpanded")
      .task-form.form-group
        .col-2
          label.form-switch
            input(type="checkbox" v-model="isCurrentWeek")
            i.form-icon
            span This Week
          .input-group
            span.input-group-addon Weekday
            select.form-select.select-lg.input_select(v-model="weekday")
              option(v-for="wday in wdays" :value="wday.value" :key="wday.value") {{wday.text}}
        .col-9
          textarea#omni-input_descritpion.form-input(placeholder="Task Descriptions" rows="3" v-model="description")
        .col-1.align-right
          button.btn.btn-primary.input-group-btn.btn-lg.btn_maximum(@click="postTask") Post
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'
@Component
export default class OmniInput extends Vue {
  selectedType: string = 'monologue'
  typeOptions: { text: string; value: string }[] = [
    { text: 'New Monologue', value: 'monologue' },
    { text: 'New Task', value: 'task' },
  ]
  selectedRange: string = 'organization'
  rangeOptions: { text: string; value: string }[] = [
    { text: 'Organization', value: 'organization' },
    { text: 'Team', value: 'team' },
    { text: 'Me', value: 'me' },
  ]
  wdays: { text: string; value: number }[] = [
    { text: '日', value: 0 },
    { text: '月', value: 1 },
    { text: '火', value: 2 },
    { text: '水', value: 3 },
    { text: '木', value: 4 },
    { text: '金', value: 5 },
    { text: '土', value: 6 },
  ]
  content: string = ''
  taskFormExpanded: boolean = false
  description: string = ''
  isCurrentWeek: boolean = true
  weekday: number = new Date().getDay()
  @Getter getCurrentParams
  @Action addMonologue
  @Action addTask
  get currentRangeOptions() {
    const options: { text: string; value: string }[] = []
    options.push(this.rangeOptions[0])
    if (this.getCurrentParams.team) {
      options.push(this.rangeOptions[1])
    }
    options.push(this.rangeOptions[2])
    return options
  }
  post(): void {
    if (this.content) {
      if (this.selectedType === 'monologue') {
        const monologue = {
          line: this.content,
          range: this.selectedRange,
        }
        this.addMonologue(monologue)
        this.clearForm()
      } else if (this.selectedType === 'task') {
        this.taskFormExpand()
      } else {
        return
      }
    }
  }
  taskFormExpand(): void {
    this.taskFormExpanded = true
  }
  postTask(): void {
    const newTask = {
      range: this.selectedRange,
      title: this.content,
      description: this.description,
      weekday: this.weekday,
      isCurrentWeek: this.isCurrentWeek,
    }
    this.addTask(newTask)
    this.clearForm()
  }
  clearForm(): void {
    this.content = ''
    this.description = ''
    this.isCurrentWeek = true
    this.weekday = new Date().getDay()
    this.taskFormExpanded = false
  }
}
</script>

<style scoped lang="sass">
.omni-input
  .input_select, .input_btn
    flex-grow: 1
  .input_text
    flex-grow: 9
.task-form
  background-color: $papaya
  border-radius: 5px
  padding: 8px
.align-right
  text-align: right
.btn_maximum
  width: 100%
  height: 100%
</style>
