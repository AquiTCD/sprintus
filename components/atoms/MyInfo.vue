<template lang="pug">
  div
    p {{me.name}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class MyInfo extends Vue {
  @Prop(Object) me?
}
</script>

<style scoped lang="stylus">
</style>
