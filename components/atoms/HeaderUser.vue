<template lang="pug">
  .header-member.dropdown
    .member.dropdown-toggle(tabindex="0")
      figure.avatar.nav-avatar(:data-initial="me.name | toInitialName" v-show="me.name" :class="{hasAvatar: me.avatarUrl}")
        img(:src="me.avatarUrl" v-if="me.avatarUrl")
    ul.menu.member-menu
      //- li.divider(data-content="Langueage")
      //- li.menu-item
        a(@click="") 日本語
      //- li.menu-item
        a(@click="") English
      li.divider(data-content="設定")
      li.menu-item
        a(@click="openEditMeModal") 設定変更
      //- li.menu-item
        a(@click="openRequestPermissionModal") 管理権限を承認
      li.divider
      li.menu-item
        nuxt-link(to="/logout") ログアウト
    EditMeModal(:isActive="isEditingMe" @closeModal="closeEditMeModal")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import EditMeModal from '~/components/atoms/EditMeModal.vue'
@Component({
  components: {
    EditMeModal,
  },
})
export default class HeaderUser extends Vue {
  @Prop(Object) me
  isRequestingPermission = false
  isEditingMe = false
  openEditMeModal(): void {
    this.isEditingMe = true
  }
  closeEditMeModal(): void {
    this.isEditingMe = false
  }
}
</script>

<style scoped lang="sass">
.user
.member-avatar
  background-color: $gray-color
  &.hasAvatar
    background-color: transparent
.menu.member-menu
  left: inherit
  right: 0
</style>
