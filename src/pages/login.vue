<template lang="pug">
main.main
  .modal.active
    .modal-overlay
    form.modal-container(@submit.prevent)
      .modal-header
        .modal-title.h3 {{$t('login.title')}}
      .modal-body
        .loading.loading-lg(v-if="isAuthing")
        .content(v-else)
          .logged_in(v-if="isloggedIn")
            .messages
              p {{$t('login.loginedName.prefix')}}{{displayName}}{{$t('login.loginedName.suffix')}}
            .continue(v-if="isSignedUp")
            .init(v-else)
              .divider.text-center(data-content="User Information")
              h4 {{$t('login.user')}}
              label.form-label(for="login-as-firsttime-name") {{$t('login.name')}}
              input.form-input#login-as-firsttime-name(type="text" :placeholder="displayName" v-model="user.name")
              p {{$t('login.notice')}}
              h4 {{$t('login.belongingOrganization')}}
              label.form-radio
                input(type="radio" name="organization" value="join" v-model="joinOrCreate")
                i.form-icon
                span {{$t('login.joinOrganization')}}
              label.form-radio
                input(type="radio" name="organization" value="create" v-model="joinOrCreate")
                i.form-icon
                span {{$t('login.createOrganization')}}
              .existed(v-if="joinOrCreate === 'join'")
                label.form-label(for="login-as-firsttime-org") {{$t('login.existingOrganizaionId')}}
                input.form-input#login-as-firsttime-org(
                  type="text"
                  v-model="organizationId"
                  v-validate="{ required: true, regex: /^([a-zA-Z0-9_-]{3,})$/ }")
              .new-org(v-else)
                label.form-label(for="login-as-firsttime-org") {{$t('login.newOrganizaionId')}}
                input.form-input#login-as-firsttime-org(
                  type="text"
                  v-model="organizationId"
                  v-validate="{ required: true, regex: /^([a-zA-Z0-9_-]{3,})$/ }")
          .not_logged_in(v-else)
            button.btn.btn-primary(@click="login") {{$t('login.signUpOrLogin')}}
      .modal-footer(v-if="isloggedIn")
        nuxt-link.btn.btn-primary(:to="getDefaultPath" v-if="isSignedUp") {{$t('login.startSprintus')}}
        button.btn.btn-primary(type="submit" @click="joinOrCreateOrganization" v-else) {{$t(`login.joinOrCreate.${joinOrCreate}.prefix`)}}{{organizationId}}{{$t(`login.joinOrCreate.${joinOrCreate}.suffix`)}}
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
  async login() {
    try {
      this.isAuthing = true
      const data: any = await auth.signInWithPopup(provider)
      await this.createOrFindUser(data.user)
      this.accessToken = data.user.uid
      this.user.id = data.user.uid
      this.user.name = data.user.displayName
      this.user.avatarUrl = data.user.photoURL
      this.displayName = data.user.displayName
      await this.saveAccessToken(this.accessToken)
      const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))
      await sleep(1000)
      this.isloggedIn = true
      this.isAuthing = false
    } catch (e) {
      alert(e.message)
    }
  }
  async joinOrCreateOrganization() {
    try {
      const valid = await this.$validator.validateAll()
      if (!valid) {
        throw new Error('form inputs are invalid')
      }
      const organizationId = this.organizationId.toLowerCase()
      const user = {
        id: this.user.id,
        name: this.user.name,
        avatarUrl: this.user.avatarUrl,
        organizationId: organizationId,
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
      this.$router.push('/' + organizationId)
    } catch (e) {
      alert(e.message)
    }
  }
}
</script>

<style scoped lang="sass">
</style>
