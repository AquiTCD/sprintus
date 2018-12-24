
<template lang="pug">
  .modal(:class="{active: isActive}")
    .modal-overlay(aria-label="Close" @click="closeModal")
    .modal-container
      .modal-header
        .modal-title.h3 設定変更
      .modal-body
        .content
          .form-group
            label.form-label(for="edit-member-name") 表示名
            input.form-input#edit-member-name(type="text" placeholder="表示名" v-model="member.name")
          .form-group
            label.form-label(for="edit-member-avatarUrl") アバター画像URL
            input.form-input#edit-member-avatarUrl(type="text" placeholder="https://" v-model="member.avatarUrl")
          .divider(data-content="共通の設定")
          //- span デフォルトの入力のタイプ
          //- .form-group
            select.form-select.select-lg.input_select(v-model="user.preferences.default.postType")
              option(v-for="type in postTypes" :value="type.value" :key="type.value") {{type.text}}
          //- span デフォルトの独り言の範囲
          //- .form-group
            select.form-select.select-lg.input_select(v-model="user.preferences.default.ranges.task")
              option(v-for="type in rangeTypes" :value="type.value" :key="type.value") {{type.text}}
          //- span デフォルトのタスクの範囲
          //- .form-group
            select.form-select.select-lg.input_select(v-model="user.preferences.default.ranges.task")
              option(v-for="type in rangeTypes" :value="type.value" :key="type.value") {{type.text}}
          //- span デフォルトOrganization
          //- .form-group
            select.form-select.select-lg.input_select(v-model="user.preferences.default.path.organizationId")
              option(v-for="type in rangeTypes" :value="type.value" :key="type.value") {{type.text}}
          //- span デフォルトTeam
          //- .form-group
            select.form-select.select-lg.input_select(v-model="user.preferences.default.path.teamId")
              option(v-for="type in rangeTypes" :value="type.value" :key="type.value") {{type.text}}
      .modal-footer
        button.btn.btn-primary(@click="updateMe") {{buttonText}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class EditMeModal extends Vue {
  @Prop(Boolean) isActive: boolean
  @Prop(Boolean) forOrganization: boolean
  @Action updateUser
  @Action updateMember
  user = {
    preferences: {
      default: {
        portType: null,
        ranges: {
          task: null,
          monologue: null,
        },
      },
    },
  }
  member = {}
  postTypes: { text: string; value: string }[] = [
    { text: 'task', value: 'task' },
    { text: 'monologue', value: 'monologue' },
    { text: 'latest', value: 'latest' },
  ]
  rangeTypes: { text: string; value: string }[] = [
    { text: 'organization', value: 'organization' },
    { text: 'team', value: 'team' },
    { text: 'me', value: 'me' },
    { text: 'latest', value: 'latest' },
  ]
  get buttonText() {
    return '設定を更新'
  }
  created() {
    const user: any = {}
    const member: any = {}
    user.id = this.$store.state.me.id
    member.name = this.$store.state.me.name
    member.avatarUrl = this.$store.state.me.avatarUrl
    user.preferences = this.$store.state.me.preferences
    user.preferences.default = this.$store.state.me.preferences.default
    user.preferences.default.postType = this.$store.state.me.preferences.default.postType
    user.preferences.default.ranges.task = this.$store.state.me.preferences.default.ranges.task
    user.preferences.default.ranges.monologue = this.$store.state.me.preferences.default.ranges.monologue
    this.user = user
    this.member = member
  }
  updateMe(): void {
    // this.updateUser(this.user)
    //   .then(() => {
    //     this.updateMember(this.member)
    //   })
    this.updateMember(this.member).then(() => {
      this.closeModal()
    })
  }
  closeModal(): void {
    this.$emit('closeModal')
  }
}
</script>

<style scoped lang="sass">
</style>
