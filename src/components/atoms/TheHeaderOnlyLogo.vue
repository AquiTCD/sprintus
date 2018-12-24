<template lang="pug">
  header.the_header.navbar
    section.navbar-section
      .navbar-brand
        h1.brand Sprintus
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class TheHeaderOnlyLogo extends Vue {}
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
.brand
  color: $pure-black
  font-size: 1rem
  font-weight: bold
  margin-bottom: 0
</style>
