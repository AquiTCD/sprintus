<template lang="pug">
  .modal(:class="{active: isActive}")
    .modal-overlay(aria-label="Close" @click="closeModal")
    .modal-container
      .modal-header
        .modal-title.h3 {{title}}
      .modal-body
        .content
          .form-group
            label.form-label(for="edit-group-id") ID
            input.form-input#edit-group-id(type="text" placeholder="ID" v-model="group.id" disabled)
          .form-group
            label.form-label(for="edit-group-name") 表示名
            input.form-input#edit-group-name(type="text" placeholder="表示チーム名" v-model="group.name")
          .form-group
            label.form-switch
              input(type="checkbox" v-model="group.requiresApproval" disabled)
              i.form-icon
              span 参加には承認が必要(開発版では変更できません)
          .divider(data-content="曜日の設定")
          span 週の開始曜日
          .beggeinig-weekday(v-if="forOrganization")
            .form-group
              select.form-select.select-lg.input_select(v-model="group.begginingWeekday")
                option(v-for="wday in wdays" :value="wday.value" :key="wday.value") {{wday.text}}
          .beggeinig-weekday(v-else)
            .form-group
              label.form-switch 週の開始曜日は{{getCurrentOrganizationName}}に従う
                input(type="checkbox" v-model="group.isOrganizationWeekday")
                i.form-icon
            .form-group
              select.form-select.select-lg.input_select(v-model="group.begginingWeekday" :disabled="group.isOrganizationWeekday")
                option(v-for="wday in wdays" :value="wday.value" :key="wday.value") {{wday.text}}
          span 休日の曜日設定
          .holiday(v-if="forOrganization")
            .form-group
              label.form-checkbox.form-inline(v-for="wday in wdays" :key="wday.value") {{wday.text}}
                input(type="checkbox" :value="wday.value" v-model="group.holidayWeekdays")
                i.form-icon
          .holiday(v-else)
            .form-group
              label.form-switch 休日は{{getCurrentOrganizationName}}に従う
                input(type="checkbox" v-model="group.isOrganizationHolidays")
                i.form-icon
            .form-group
              label.form-checkbox.form-inline(v-for="wday in wdays" :key="wday.value") {{wday.text}}
                input(type="checkbox" :value="wday.value" v-model="group.holidayWeekdays" :disabled="group.isOrganizationHolidays")
                i.form-icon
      .modal-footer
        button.btn.btn-primary(@click="updateGroup") {{buttonText}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class EditGroupModal extends Vue {
  @Prop(Boolean) isActive: boolean
  @Prop(Boolean) forOrganization: boolean
  @Getter getCurrentOrganizationName
  @Getter getCurrentTeamName
  @Action updateOrganization
  @Action updateTeam
  get title() {
    if (this.forOrganization) {
      return `Edit Organization:${this.current}`
    } else {
      return `Edit Team:${this.current}`
    }
  }
  get current() {
    if (this.forOrganization) {
      return this.getCurrentOrganizationName
    } else {
      return this.getCurrentTeamName
    }
  }
  get buttonText() {
    return `${this.current} を更新`
  }
  group: any = {
    id: '',
    name: '',
    requiresApproval: false,
    isOrganizationWeekday: true,
    begginingWeekday: null,
    isOrganizationHolidays: true,
    holidayWeekdays: [],
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
    const group: any = {}
    if (this.forOrganization) {
      group.id = this.$store.state.currentParams.organization
      group.name = this.$store.state.currentOrganization.name
      group.requiresApproval = this.$store.state.currentOrganization.requiresApproval
      group.begginingWeekday = this.$store.state.currentOrganization.begginingWeekday
      group.holidayWeekdays = this.$store.state.currentOrganization.holidayWeekdays
    } else {
      group.id = this.$store.state.currentParams.team
      if (this.$store.state.currentTeam) {
        group.name = this.$store.state.currentTeam.name
        group.requiresApproval = this.$store.state.currentTeam.requiresApproval
        group.isOrganizationWeekday = this.$store.state.currentTeam.isOrganizationWeekday
        group.begginingWeekday = this.$store.state.currentTeam.begginingWeekday
        group.isOrganizationHolidays = this.$store.state.currentTeam.isOrganizationHolidays
        group.holidayWeekdays = this.$store.state.currentTeam.holidayWeekdays
      }
    }
    this.group = group
  }
  updateGroup(): void {
    if (this.forOrganization) {
      this.updateOrganization(this.group).then(() => {
        this.closeModal()
      })
    } else {
      this.updateTeam(this.group).then(() => {
        this.closeModal()
      })
    }
  }
  closeModal(): void {
    this.$emit('closeModal')
  }
}
</script>

<style scoped lang="sass">
</style>
