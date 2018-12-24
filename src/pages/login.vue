<template lang="pug">
main.main
  .modal.active
    .modal-container
      .modal-header
        .modal-title.h3 SignUp / SignIn
      .modal-body
        .loading.loading-lg(v-if="isAuthing")
        .content(v-else)
          .logged_in(v-if="isloggedIn")
            .messages
              p 「
                span {{displayName}}
                | 」としてログインしました
            .continue(v-if="isSignedUp")
            .init(v-else)
              .divider.text-center(data-content="User Information")
              h4 ユーザー
              label.form-label(for="login-as-firsttime-name") 名前
              input.form-input#login-as-firsttime-name(type="text" :placeholder="displayName" v-model="user.name")
              p ※設定からいつでも変更することができます
              h4 所属組織
              label.form-radio
                input(type="radio" name="organization" value="join" v-model="joinOrCreate")
                i.form-icon
                span 既存のOrganizationに参加する
              label.form-radio
                input(type="radio" name="organization" value="create" v-model="joinOrCreate")
                i.form-icon
                span 新規にOrganizationを作成する
              .existed(v-if="joinOrCreate === 'join'")
                label.form-label(for="login-as-firsttime-org") 既存のOrganization ID
                input.form-input#login-as-firsttime-org(type="text" v-model="organizationId" pattern="^[0-9A-Za-z]+$")
              .new-org(v-else)
                label.form-label(for="login-as-firsttime-org") 新規に作成するOrganization ID
                input.form-input#login-as-firsttime-org(type="text" v-model="organizationId" pattern="^[0-9A-Za-z]+$")
          .not_logged_in(v-else)
            button.btn.btn-primary(@click="login") SignUp/Login by Google Account
      .modal-footer(v-if="isloggedIn")
        nuxt-link.btn.btn-primary(:to="getDefaultPath" v-if="isSignedUp") {{buttonText}}
        button.btn.btn-primary(@click="joinOrCreateOrganization" v-else) {{buttonText}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Getter, Action } from 'vuex-class'
import { auth, provider } from '~/plugins/firebase'
@Component({})
export default class extends Vue {
  isloggedIn: boolean = false
  isAuthing: boolean = false
  joinOrCreate: string = 'join'
  displayName: string = ''
  organizationId: string = ''
  accessToken: string = ''
  user = {
    id: '',
    name: '',
    avatarUrl: '',
  }
  get buttonText(): string {
    const base = 'Sprintusを始める'
    let orgnizationName = 'Organization'
    if (this.organizationId) {
      orgnizationName = this.organizationId
    }
    let msg
    if (this.isSignedUp) {
      msg = base
    } else if (this.joinOrCreate === 'join') {
      msg = orgnizationName + 'に参加して' + base
    } else if (this.joinOrCreate === 'create') {
      msg = orgnizationName + 'を新規作成して' + base
    }
    return msg
  }
  get isSignedUp() {
    if (!this.getDefaultPath || this.getDefaultPath === '/') {
      return false
    } else {
      return true
    }
  }
  @Getter getDefaultPath
  @Action createOrFindUser
  @Action joinToOrganization
  @Action addOrganization
  @Action updateUser
  @Action saveAccessToken
  login() {
    this.isAuthing = true
    auth
      .signInWithPopup(provider)
      .catch(error => alert('🤕' + error.message))
      .then(
        (data: any): void => {
          this.createOrFindUser(data.user)
          this.accessToken = data.user.uid
          this.user.id = data.user.uid
          this.user.name = data.user.displayName
          this.user.avatarUrl = data.user.photoURL
          this.displayName = data.user.displayName
        }
      )
      .then(() => {
        this.saveAccessToken(this.accessToken)
        this.isloggedIn = true
      })
      .then(() => {
        this.isAuthing = false
      })
  }
  async joinOrCreateOrganization() {
    const user = {
      id: this.user.id,
      name: this.user.name,
      avatarUrl: this.user.avatarUrl,
      organizationId: this.organizationId,
    }
    if (this.joinOrCreate === 'join') {
      await this.joinToOrganization(user)
    } else {
      await this.addOrganization(user)
    }
    await this.updateUser({
      id: this.user.id,
      'preferences.default.path.organizationId': user.organizationId,
      organizationIds: [user.organizationId],
    })
    this.$router.push('/' + this.organizationId)
  }
}
</script>

<style scoped lang="sass">
</style>
