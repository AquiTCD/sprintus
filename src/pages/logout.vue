<template lang="pug">
main.main
  .modal.active
    .modal-overlay
    .modal-container
      .modal-header
        .modal-title.h3 {{$t('logout.title')}}
      .modal-body
        .content
          p {{$t('logout.loggedOut')}}
      .modal-footer
        nuxt-link.btn.btn-primary(to="/") OK
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Getter, Action } from 'vuex-class'
import { auth, provider } from '~/plugins/firebase'
@Component({})
export default class extends Vue {
  fetch({ app }) {
    auth
      .signOut()
      .then(() => {
        app.$cookies.remove('sprintus-access-token')
      })
      .catch(error => {})
  }
}
</script>

<style scoped lang="sass">
</style>
