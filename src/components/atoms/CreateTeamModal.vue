<template lang="pug">
  .modal(:class="{active: isActive}")
    .modal-overlay(aria-label="Close" @click="closeModal")
    .modal-container
      .modal-header
        .modal-title.h3 Create New Team
      .modal-body
        .content
          .divider(data-content="基本設定")
          .form-group
            label.form-label(for="create-team-id") チームID
            input.form-input#create-team-id(type="text" placeholder="teamId" v-model="team.id" pattern="^[0-9A-Za-z]+$")
            span ※英数字のみ, IDは後から変更することはできません
          .form-group
            label.form-label(for="create-team-name") チーム名
            input.form-input#create-team-name(type="text" placeholder="表示チーム名" v-model="team.name")
          .form-group
            label.form-switch
              input(type="checkbox" v-model="team.requiresApproval" disabled)
              i.form-icon
              span 参加には承認が必要(開発版では変更できません)
          .divider(data-content="曜日の設定")
          .form-group
            span 週の開始曜日
            label.form-switch 週の開始曜日は{{getCurrentOrganizationName}}に従う
              input(type="checkbox" v-model="team.isOrganizationWeekday")
              i.form-icon
          .form-group
            select.form-select.select-lg.input_select(v-model="team.begginingWeekday" :disabled="team.isOrganizationWeekday")
              option(v-for="wday in wdays" :value="wday.value" :key="wday.value") {{wday.text}}
          div
            span 休日の曜日設定
          .form-group
            label.form-switch 休日は{{getCurrentOrganizationName}}に従う
              input(type="checkbox" v-model="team.isOrganizationHolidays")
              i.form-icon
          .form-group
            label.form-checkbox.form-inline(v-for="wday in wdays" :key="wday.value") {{wday.text}}
              input(type="checkbox" :value="wday.value" v-model="team.holidayWeekdays" :disabled="team.isOrganizationHolidays")
              i.form-icon
      .modal-footer
        button.btn.btn-primary(@click="createTeam") {{buttonText}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class CreateTeamModal extends Vue {
  @Prop(Boolean) isActive: boolean
  @Action addNewTeam
  @Action joinToTeam
  @Getter getCurrentOrganizationName
  @Getter getCurrentTeam
  team: {
    id: string;
    name: string;
    requiresApproval: boolean;
    isOrganizationWeekday: boolean;
    begginingWeekday: null | number;
    isOrganizationHolidays: boolean;
    holidayWeekdays: number[];
  } = {
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
  get buttonText() {
    let name = ''
    if (this.team.name) {
      name = this.team.name
    } else if (this.team.id) {
      name = this.team.id
    } else {
      name = 'New Team'
    }
    return `${this.getCurrentOrganizationName} に ${this.team.name} を作成`
  }
  createTeam(): void {
    this.addNewTeam(this.team)
      .then(() => {
        this.joinToTeam(this.team)
      })
      .then(() => {
        this.closeModal()
      })
      .then(() => {
        this.$router.push(
          `/${this.$store.state.currentParams.organization}/${this.team}`
        )
      })
  }
  closeModal(): void {
    this.$emit('closeModal')
  }
}
</script>

<style scoped lang="sass">
</style>
