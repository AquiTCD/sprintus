<template lang="pug">
footer.the_footer
  OmniInput()
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import OmniInput from '~/components/molecules/OmniInput.vue'
@Component({
  components: {
    OmniInput,
  },
})
export default class TheFooter extends Vue {}
</script>

<style scoped lang="sass">
.the_footer
  position: fixed
  bottom: 0
  left: 0
  background: $secondary-color
  width: 100vw
  padding: 8px 13px
  z-index: 1
</style>
