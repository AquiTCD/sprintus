<template lang="pug">
  td {{me.name}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class BoardUserInfo extends Vue {
  @Prop(Object) me: object
}
</script>

<style scoped lang="stylus">
</style>
