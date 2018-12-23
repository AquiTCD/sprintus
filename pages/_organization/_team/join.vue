<template lang="pug">
main.main
  .modal.active
    .modal-container
      .modal-header
        .modal-title.h3 Joining Team
      .modal-body
        .content
          p 移動しようとしているTeamのメンバーではありません
          p メンバーになりますか？
      .modal-footer
        .btn-group.btn-group-block
          nuxt-link.btn(:to="'/'+params.organization") キャンセル
          button.btn.btn-primary(@click="join") メンバーになる
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Getter, Action } from 'vuex-class'
import { auth, provider } from '~/plugins/firebase'
@Component({
  middleware: ['auth', 'info'],
})
export default class extends Vue {
  @Action joinToTeam
  params: any = null
  async asyncData({ params }) {
    return { params: params }
  }
  async join() {
    await this.joinToTeam(this.params.team)
    this.$router.push(`/${this.params.organization}/${this.params.team}`)
  }
}
</script>

<style scoped lang="sass">
</style>
