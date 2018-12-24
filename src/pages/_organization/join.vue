<template lang="pug">
main.main
  .modal.active
    .modal-container
      .modal-header
        .modal-title.h3 Joining Organization
      .modal-body
        .loading.loading-lg(v-if="isAuthing")
        .content(v-else)
          p 移動しようとしているOrganizationのメンバーではありません
          p 認証が必要ですがメンバーになりますか？
          button.btn.btn-primary(@click="login" v-if="!isLoggedIn") SignUp/Login by Google Account
        .form(v-if="isLoggedIn")
          .divider.text-center(data-content="User Information")
          h4 ユーザー
          label.form-label(for="login-as-firsttime-name") 名前
          input.form-input#login-as-firsttime-name(type="text" :placeholder="displayName" v-model="user.name")
      .modal-footer
        .btn-group.btn-group-block
          nuxt-link.btn(:to="'/'+params.organization") キャンセル
          button.btn.btn-primary(@click="join" v-if="isLoggedIn") メンバーになる
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Getter, Action } from 'vuex-class'
import { auth, provider } from '~/plugins/firebase'
@Component({
  middleware: ['auth', 'info'],
})
export default class extends Vue {
  isLoggedIn: boolean = false
  isAuthing: boolean = false
  displayName: string = ''
  user = {
    id: '',
    name: '',
    avatarUrl: '',
  }
  @Action joinToOrganization
  @Action addOrganizationToUser
  params: any = null
  async asyncData({ params }) {
    return { params: params }
  }
  async join() {
    const user = {
      id: this.user.id,
      name: this.user.name,
      avatarUrl: this.user.avatarUrl,
      organizationId: this.params.organization,
    }
    await this.joinToOrganization(user)
    await this.addOrganizationToUser(this.params.organization)
    this.$router.push(`/${this.params.organization}`)
  }
  login() {
    this.isAuthing = true
    auth
      .signInWithPopup(provider)
      .catch(error => alert('🤕' + error.message))
      .then(
        (data: any): void => {
          this.user.id = data.user.uid
          this.user.name = data.user.displayName
          this.user.avatarUrl = data.user.photoURL
          this.displayName = data.user.displayName
        }
      )
      .then(() => {
        this.isLoggedIn = true
        this.isAuthing = false
      })
  }
}
</script>

<style scoped lang="sass">
</style>
