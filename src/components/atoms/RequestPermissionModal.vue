<template lang="pug">
  .modal(:class="{active: isActive}")
    .modal-overlay(aria-label="Close" @click="closeModal")
    .modal-container
      .modal-header
        .modal-title.h3 {{title}}
      .modal-body
        //- .content
          h4 {{current}} の管理権限を持つメンバー
          ul
            li(v-for="admin in administrators") {{admin}}
      .modal-footer
        button.btn.btn-primary(@click="requestPermission") {{buttonText}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class RequestPermissionModal extends Vue {
  @Prop(Boolean) isActive: boolean
  @Prop(Boolean) forOrganization: boolean
  @Action addPendingAdministratorIdToOrganization
  @Action addPendingAdministratorIdToTeam
  @Getter getCurrentOrganizationName
  @Getter getCurrentTeamName
  get title() {
    if (this.forOrganization) {
      return `Request Organization:${this.current} Permission`
    } else {
      return `Request Team:${this.current} Permission`
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
    return `${this.current} の管理権限を申請`
  }
  get administrators() {
    let result
    if (this.forOrganization) {
      result = this.$store.state.currentOrganization.administratorIds
    } else {
      if (this.$store.state.currentTeam) {
        result = this.$store.state.currentTeam.administratorIds
      }
    }
    return result
  }
  requestPermission(): void {
    if (this.forOrganization) {
      this.addPendingAdministratorIdToOrganization().then(() => {
        this.closeModal()
      })
    } else {
      this.addPendingAdministratorIdToTeam().then(() => {
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
