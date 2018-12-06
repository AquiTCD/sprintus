<template lang="pug">
  ul
    p fb test
    li(v-for="(doc, docIdx) in docs"
      :key="docIdx")
      ul
        li {{ doc.title }}
        li {{ doc.body }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
@Component
export default class extends Vue {
  @Getter getDocs
  @Action setDocsRef
  created() {
    this.setDocsRef()
  }
  get docs() {
    return this.getDocs
  }
}
</script>

<style scoped lang="sass">
.heading

</style>
