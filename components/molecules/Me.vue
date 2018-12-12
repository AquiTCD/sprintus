<template lang="pug">
  div
    MyInfo(:me="me")
    MyMonologue
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyInfo from '~/components/atoms/MyInfo.vue'
import MyMonologue from '~/components/atoms/MyMonologue.vue'
@Component({
  components: {
    MyInfo,
    MyMonologue,
  },
})
export default class Me extends Vue {
  @Prop(Object) me?
}
</script>

<style scoped lang="sass">
</style>
