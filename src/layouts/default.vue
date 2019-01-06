<template lang="pug">
  div.body
    TheHeaderOnlyLogo.body-header()
    nuxt.nuxt
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import TheHeaderOnlyLogo from '~/components/atoms/TheHeaderOnlyLogo.vue'
@Component({
  components: {
    TheHeaderOnlyLogo,
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
