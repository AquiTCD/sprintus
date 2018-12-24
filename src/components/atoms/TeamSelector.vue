<template lang="pug">
  .team-selector.dropdown
    .btn.btn-link.dropdown-toggle(tabindex="0")
      span.dropping {{getCurrentTeamName}} ▼
      i.icon.icon-caret.dropping
    ul.menu.team-menu
      li.menu-item
        nuxt-link(:to="organizationPath") {{getCurrentOrganizationName}} に戻る
      li.divider(:data-content="dropTitle" v-if="hasCurrentTeam")
      li.menu-item(v-if="hasCurrentTeam && hasPermission")
        a(@click="openEditGroupModal") 設定変更
      li.menu-item(v-if="hasCurrentTeam && !hasPermission")
        a(@click="openRequestPermissionModal") 管理権限を申請
      li.divider(data-content="Teamに参加/移動")
      li.menu-item(v-for="team in getTeamPathWithNames" :key="team.path")
        nuxt-link(:to="team.path") {{team.name}}
      li.divider
      li.menu-item
        a(@click="openCreateTeamModal") Teamを新規作成
    EditGroupModal(:isActive="isEditingGroup" :forOrganization="false" @closeModal="closeEditGroupModal")
    CreateTeamModal(:isActive="isCreatingTeam" @closeModal="closeCreateTeamModal")
    RequestPermissionModal(:isActive="isRequestingPermission" :forOrganization="false" @closeModal="closeRequestPermissionModal" v-if="!hasPermission")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import EditGroupModal from '~/components/atoms/EditGroupModal.vue'
import CreateTeamModal from '~/components/atoms/createTeamModal.vue'
import RequestPermissionModal from '~/components/atoms/RequestPermissionModal.vue'
@Component({
  components: {
    EditGroupModal,
    CreateTeamModal,
    RequestPermissionModal,
  },
})
export default class TeamSelector extends Vue {
  @Getter getCurrentOrganizationName
  @Getter getCurrentTeamName
  @Getter getHasTeamPermission
  @Getter getTeamPathWithNames
  isEditingGroup = false
  isRequestingPermission = false
  isCreatingTeam = false
  test = 'test'
  get hasCurrentTeam() {
    return !!this.$store.state.currentParams.team
  }
  get hasPermission() {
    return this.getHasTeamPermission
  }
  get dropTitle() {
    return `${this.getCurrentTeamName}の設定`
  }
  get organizationPath() {
    return `/${this.$store.state.currentParams.organization}`
  }
  openCreateTeamModal(): void {
    this.isCreatingTeam = true
  }
  closeCreateTeamModal(): void {
    this.isCreatingTeam = false
  }
  openEditGroupModal(): void {
    if (this.hasPermission) {
      this.isEditingGroup = true
    }
  }
  closeEditGroupModal(): void {
    this.isEditingGroup = false
  }
  openRequestPermissionModal(): void {
    if (!this.hasPermission) {
      this.isRequestingPermission = true
    }
  }
  closeRequestPermissionModal(): void {
    this.isRequestingPermission = false
  }
}
</script>

<style scoped lang="sass">
.team-selector
  display: inline-block
.dropping
  color: $body-font-color
.menu.team-menu
  width: 256px
</style>
