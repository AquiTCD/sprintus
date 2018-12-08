<template lang="pug">
  th.wday {{weekday}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class BoardHeaderWday extends Vue {
  @Prop(Number) wday: number
  get weekday() {
    switch (this.wday) {
      case 0:
        return '日'
      case 1:
        return '月'
      case 2:
        return '火'
      case 3:
        return '水'
      case 4:
        return '木'
      case 5:
        return '金'
      case 6:
        return '土'
      default:
        return 'err'
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
