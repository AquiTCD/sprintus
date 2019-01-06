<template lang="pug">
  thead
    tr.header
      BoardHeaderItem.cell(:text="firstText")
      BoardHeaderWday.cell(
        v-for="wday in wdays"
        :key="wday"
        :wday="wday")
      BoardHeaderItem.cell(:text="lastText")
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
  firstText = 'Members'
  lastText = 'Pendings'
}
</script>

<style scoped lang="sass">
.cell
  font-weight: bold
  min-width: 200px
  text-align: center
  background-color: $white
  &:first-of-type
    min-width: 128px
    border-radius: $border-radius 0 0 0
  &:last-of-type
    border-radius: 0 $border-radius 0 0
</style>
