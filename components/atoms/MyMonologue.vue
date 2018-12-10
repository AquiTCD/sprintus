<template lang="pug">
  div
    vs-textarea(v-model="line")
    vs-button(@click="postLine" type="relief") Post
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class MyMonologue extends Vue {
  line = ''
  @Action addMonologue
  postLine() {
    if (this.line) {
      this.addMonologue(this.line)
      this.line = ''
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
