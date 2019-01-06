<template lang="pug">
  header.the_header.navbar
    section.navbar-section
      NavbarLogo
    section.navbar-section
      button.btn(@click="moveToLogin") Login
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import NavbarLogo from '~/components/atoms/NavbarLogo.vue'
@Component({
  components: {
    NavbarLogo,
  },
})
export default class TheHeaderOnlyLogo extends Vue {
  moveToLogin(): void {
    this.$router.push('/login')
  }
}
</script>

<style scoped lang="sass">
.the_header
  position: fixed
  top: 0
  left: 0
  background: $primary-color
  width: 100vw
  z-index: 2
  padding: 8px 13px
  min-heigth: 50px
.brand
  color: $pure-black
  font-size: 1rem
  font-weight: bold
  margin-bottom: 0
</style>
