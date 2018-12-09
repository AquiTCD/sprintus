<template lang="pug">
  header.the_header
    vs-navbar.brand(v-model="activeItem"
              color="primary")
      vs-navbar-title.brand Sprintus

      vs-spacer
      vs-button.new-task_btn(color="secondary" type="filled" icon="add_box") New Task
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class TheHeader extends Vue {}
</script>

<style scoped lang="stylus">
.brand
  color: $pure-black
  font-size: 1em
.new-task_btn
  font-size: 0.8em
  font-weight: bold
</style>
