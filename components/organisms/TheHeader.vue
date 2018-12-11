<template lang="pug">
  header.the_header
    vs-navbar.brand(v-model="activeItem"
              color="primary")
      vs-navbar-title Sprintus
      vs-spacer
      //- vs-button.new-task_btn(@click="open" color="secondary" type="filled" icon="add_box") New Task
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class TheHeader extends Vue {
  activeItem = ''
}
</script>

<style scoped lang="stylus">
.brand
  color: $pure-black
.new-task_btn
  font-size: 0.8em
  font-weight: bold
</style>
