<template lang="pug">
  header.the_header.navbar.bg-primary
    section.navbar-section
      .navbar-brand Sprintus
    section.navbar-section
      button.btn.bg-secondary New Task
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class TheHeader extends Vue {}
</script>

<style scoped lang="sass">
.navbar-brand
  color: $pure-black
  font-size: 1em
.new-task_btn
  font-size: 0.8em
  font-weight: bold
</style>
