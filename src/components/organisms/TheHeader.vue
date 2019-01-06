<template lang="pug">
  header.the_header.navbar
    section.navbar-section
      NavbarLogo
    section.navbar-center
      h2.range
        OrganizationSelector
        TeamSelector
    section.navbar-section
      HeaderUser(:me="me")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import NavbarLogo from '~/components/atoms/NavbarLogo.vue'
import HeaderUser from '~/components/atoms/HeaderUser.vue'
import OrganizationSelector from '~/components/atoms/OrganizationSelector.vue'
import TeamSelector from '~/components/atoms/TeamSelector.vue'
@Component({
  components: {
    NavbarLogo,
    HeaderUser,
    OrganizationSelector,
    TeamSelector,
  },
})
export default class TheHeader extends Vue {
  @Getter getMe
  get me() {
    return this.getMe
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
.range
  font-size: 0.9rem
  margin-bottom: 0
.organization
  font-weight: bold
</style>
