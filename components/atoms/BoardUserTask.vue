<template lang="pug">
  li
    vs-checkbox(v-model="checkBox1") {{task.title}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class BoardUserTask extends Vue {
  @Prop(Object) task: object
}
</script>

<style scoped lang="stylus">
</style>
