<template lang="pug">
  .modal(:class="{active: isActive}")
    .modal-overlay(aria-label="Close" @click="closeModal")
    form.modal-container(@submit.prevent)
      .modal-header
        .modal-title.h3 {{$t('createTeam.title')}}
      .modal-body
        .content
          .divider(data-content="基本設定")
          .form-group
            label.form-label(for="create-team-id") {{$t('createTeam.teamId')}}
            input.form-input#create-team-id(
              type="text"
              placeholder="team-id"
              v-model="team.id"
              v-validate="{ required: true, regex: /^([a-zA-Z0-9_-]{3,})$/ }")
            span {{$t('createTeam.notice')}}
          .form-group
            label.form-label(for="create-team-name") {{$t('createTeam.name')}}
            input.form-input#create-team-name(
              type="text"
              :placeholder="$t('createTeam.namePlaceholder')"
              v-model="team.name")
          .form-group
            label.form-switch
              input(type="checkbox" v-model="team.requiresApproval" disabled)
              i.form-icon
              span {{$t('createTeam.requireApproval')}}
          .divider(data-content="曜日の設定")
          .form-group
            span {{$t('createTeam.begginingWeekday')}}
            label.form-switch {{$t('createTeam.isOrganizationWeekday',  {organization: getCurrentOrganizationName})}}
              input(type="checkbox" v-model="team.isOrganizationWeekday")
              i.form-icon
          .form-group
            select.form-select.select-lg.input_select(v-model="team.begginingWeekday" :disabled="team.isOrganizationWeekday")
              option(v-for="wday in wdays" :value="wday" :key="wday") {{$t(`weekday.${wday}`)}}
          div
            span {{$t('createTeam.holidayWeekdays')}}
          .form-group
            label.form-switch {{$t('createTeam.isOrganizationHolidays',  {organization: getCurrentOrganizationName})}}
              input(type="checkbox" v-model="team.isOrganizationHolidays")
              i.form-icon
          .form-group
            label.form-checkbox.form-inline(v-for="wday in wdays" :key="wday") {{$t(`weekday.${wday}`)}}
              input(type="checkbox" :value="wday" v-model="team.holidayWeekdays" :disabled="team.isOrganizationHolidays")
              i.form-icon
      .modal-footer
        button.btn.btn-primary(@click="createTeam") {{$t('createTeam.createButton', {organization: getCurrentOrganizationName, team: teamName})}}
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
  wdays: number[] = [0, 1, 2, 3, 4, 5, 6]
  get teamName() {
    let name = ''
    if (this.team.name) {
      name = this.team.name
    } else if (this.team.id) {
      name = this.team.id
    } else {
      name = 'New Team'
    }
    return name
  }
  async createTeam() {
    try {
      const valid = await this.$validator.validateAll()
      if (!valid) {
        throw new Error('form inputs are invalid')
      }
      await this.addNewTeam(this.team)
      await this.joinToTeam(this.team.id)
      await this.closeModal()
      await this.$router.push(
        `/${this.$store.state.currentParams.organization}/${this.team.id}`
      )
    } catch (e) {
      alert(e.message)
    }
  }
  async closeModal() {
    await this.$emit('closeModal')
  }
}
</script>

<style scoped lang="sass">
</style>
