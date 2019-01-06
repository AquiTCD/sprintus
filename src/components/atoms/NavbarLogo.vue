<template lang="pug">
  .navbar-brand
    h1.brand(@click="moveToHome")
      img.logo-img.c-hand(src="~/assets/images/sprintus_logo.svg" alt="logo")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component({
  components: {},
})
export default class NavbarLogo extends Vue {
  moveToHome(): void {
    this.$router.push('/')
  }
}
</script>

<style scoped lang="sass">
.brand
  color: $pure-black
  font-size: 1rem
  font-weight: bold
  margin-bottom: 0
.logo-img
  height: 32px
</style>
