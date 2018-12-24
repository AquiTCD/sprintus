<template lang="pug">
  th {{text}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class BoardHeaderItem extends Vue {
  @Prop(String) text: string
}
</script>

<style scoped lang="sass">
</style>
