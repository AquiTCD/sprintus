<template lang="pug">
  tr
    BoardHeaderItem(:text="firstText")
    BoardHeaderWday(
      v-for="wday in wdays"
      :key="wday"
      :wday="wday")
    BoardHeaderItem(:text="lastText")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardHeaderItem from '~/components/atoms/BoardHeaderItem.vue'
import BoardHeaderWday from '~/components/atoms/BoardHeaderWday.vue'
@Component({
  components: {
    BoardHeaderItem,
    BoardHeaderWday,
  },
})
export default class BoardHeader extends Vue {
  @Prop(Array) wdays: Array<number>
  firstText = 'User'
  lastText = 'Pendings'
}
</script>

<style scoped lang="sass">
</style>
