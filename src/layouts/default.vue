<template lang="pug">
  div.body
    TheHeaderOnlyLogo.body-header()
    nuxt.background
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
.backbround
  background-color: $secondary-color
</style>
