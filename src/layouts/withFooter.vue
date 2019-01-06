<template lang="pug">
  div.body
    TheHeader.body-header()
    nuxt.nuxt
    TheFooter.body-footer()
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import TheHeader from '~/components/organisms/TheHeader.vue'
import TheFooter from '~/components/organisms/TheFooter.vue'

@Component({
  components: {
    TheHeader,
    TheFooter,
  },
})
export default class extends Vue {}
</script>

<style scoped lang="sass">
.nuxt
  padding-top: 50px
  padding-bottom: 50px
  height: 100vh
  overflow-y: scroll
  background-color: $twill
</style>
