<template lang="pug">
  li
    label.form-checkbox
      input(type="checkbox")
      i.form-icon Remember me
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class BoardUserTask extends Vue {
  @Prop(Object) task: object
}
</script>

<style scoped lang="sass">
</style>
