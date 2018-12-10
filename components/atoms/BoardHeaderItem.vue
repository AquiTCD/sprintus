<template lang="pug">
  th.header-item {{text}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class BoardHeaderItem extends Vue {
  @Prop(String) text: string
}
</script>

<style scoped lang="stylus">
</style>
