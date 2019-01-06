<template lang="pug">
  .omni-input
    .input-group
      select.form-select.select-lg.input_select(v-model="selectedType")
        option(v-for="typeOption in typeOptions"
          :value="typeOption"
          :key="typeOption") {{$t(typeOption)}}
      select.form-select.select-lg.input_select(v-model="selectedRange")
        option(v-for="option in currentRangeOptions"
          :value="option"
          :key="option") {{$t(`range.${option}`)}}
      input.form-input.input-lg.input_text(
        type="text"
        :placeholder="$t(contentPlaceholder)"
        v-model="content")
      button(v-if="!isTaskForm").btn.btn-primary.input-group-btn.btn-lg.input_btn(@click="post") Post
    .form-horizontal(v-if="isTaskForm")
      .task-form.form-group
        .col-2
          label.form-switch
            input(type="checkbox" v-model="isCurrentWeek")
            i.form-icon
            span {{$t('omniinput.currentWeek')}}
          .input-group
            span.input-group-addon {{$t('omniinput.weekday')}}
            select.form-select.select-lg.input_select(v-model="weekday")
              option(v-for="wday in wdays"
                :value="wday"
                :key="wday") {{$t(`weekday.${wday}`)}}
        .col-9
          textarea#omni-input_descritpion.form-input(
            :placeholder="$t('omniinput.description')" rows="3" v-model="description")
        .col-1.align-right
          button.btn.btn-primary.input-group-btn.btn-lg.btn_maximum(@click="postTask") Post
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'
@Component
export default class OmniInput extends Vue {
  selectedType: string = 'monologue'
  typeOptions: string[] = ['monologue', 'task']
  selectedRange: string = 'organization'
  rangeOptions: string[] = ['organization', 'team', 'me']
  wdays: number[] = [0, 1, 2, 3, 4, 5, 6]
  content: string = ''
  description: string = ''
  isCurrentWeek: boolean = true
  weekday: number = new Date().getDay()
  @Getter getCurrentParams
  @Action addMonologue
  @Action addTask
  get currentRangeOptions() {
    const options: string[] = []
    options.push(this.rangeOptions[0])
    if (this.getCurrentParams.team) {
      options.push(this.rangeOptions[1])
    }
    options.push(this.rangeOptions[2])
    return options
  }
  get contentPlaceholder() {
    return `omniinput.placeholder.${this.selectedType}`
  }
  get isTaskForm() {
    return this.selectedType === 'task'
  }
  async post() {
    if (this.content && !this.isTaskForm) {
      const monologue = {
        line: this.content,
        range: this.selectedRange,
      }
      await this.addMonologue(monologue)
      await this.clearForm()
    }
  }
  async postTask() {
    if (this.content && this.isTaskForm) {
      const newTask = {
        range: this.selectedRange,
        title: this.content,
        description: this.description,
        weekday: this.weekday,
        isCurrentWeek: this.isCurrentWeek,
      }
      await this.addTask(newTask)
      await this.clearForm()
    }
  }
  async clearForm() {
    this.content = ''
    this.description = ''
    this.isCurrentWeek = true
    this.weekday = new Date().getDay()
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
