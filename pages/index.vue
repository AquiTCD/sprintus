<template lang="pug">
  ul
    p fb test
    li(v-for="(user, userIdx) in users"
      :key="userIdx")
      ul
        li {{ user.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class extends Vue {
  @Getter getUsers
  @Action setUsersRef
  created() {
    this.setUsersRef()
  }
  get users() {
    return this.getUsers
  }
}
</script>

<style scoped lang="stylus">
</style>
