<template lang="pug">
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
  firstText = 'User'
  lastText = 'Pendings'
}
</script>

<style scoped lang="stylus">
.header
  border-bottom: 3px solid #ccc
.cell
  font-weight: bold
  min-width: 200px
  text-align: center
  &:first-child
    min-width: 128px
  &:not(:last-child)
    border-right: 3px solid #ccc
</style>
