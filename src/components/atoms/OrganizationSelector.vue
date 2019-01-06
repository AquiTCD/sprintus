<template lang="pug">
  .organization-selector.dropdown
    .btn.btn-link.dropdown-toggle(tabindex="0")
      span.dropping {{getCurrentOrganizationName}} /
    ul.menu.organization-menu
      li.menu-item
        nuxt-link(:to="organizationPath") {{$t('header.organization.backTo', {organization: getCurrentOrganizationName})}}
      li.divider(:data-content="dropTitle")
      li.menu-item(v-if="hasPermission")
        a(@click="openEditGroupModal") {{$t('header.organization.setting')}}
      li.menu-item(v-else)
        //- a(@click="openRequestPermissionModal") 管理権限を申請;
        a.disable {{$t('header.organization.claimPermission')}}
      li.divider(data-content="別のOrganization")
      li.menu-item
        //- nuxt-link(to="/") 他のOrganizationに移動
        a.disable {{$t('header.organization.changeOrganization')}}
      li.menu-item
        //- a(@click="openModalCreateOrganization") Organizationを新規作成
        a.disable {{$t('header.organization.createOrganization')}}
    EditGroupModal(:isActive="isEditingGroup" :forOrganization="true" @closeModal="closeEditGroupModal")
    RequestPermissionModal(:isActive="isRequestingPermission" :forOrganization="true" @closeModal="closeRequestPermissionModal")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import EditGroupModal from '~/components/atoms/EditGroupModal.vue'
import RequestPermissionModal from '~/components/atoms/RequestPermissionModal.vue'
@Component({
  components: {
    EditGroupModal,
    RequestPermissionModal,
  },
})
export default class OrganizationSelector extends Vue {
  @Getter getCurrentOrganizationName
  @Getter getHasOrganizationPermission
  isRequestingPermission = false
  isEditingGroup = false
  get hasPermission() {
    return this.getHasOrganizationPermission
  }
  get dropTitle() {
    return `${this.getCurrentOrganizationName}の設定`
  }
  get organizationPath() {
    return `/${this.$store.state.currentParams.organization}`
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
.organization-selector
  display: inline-block
.dropping
  color: $body-font-color
  font-weight: bold
.menu.organization-menu
  left: inherit
  right: 0
  width: 256px
.disable
  color: #ccc
  text-decoration: line-through
</style>
