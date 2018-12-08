<template lang="pug">
  div
    p {{event.user}}
    p {{event.line}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyInfo from '~/components/atoms/MyInfo.vue'
import MyMonologue from '~/components/atoms/MyMonologue.vue'
@Component
export default class Me extends Vue {
  @Prop(Object) event?
}
</script>

<style scoped lang="stylus">
</style>
