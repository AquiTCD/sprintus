<template lang="pug">
  div.the-board
    table.board
      BoardHeader(:wdays="wdays")
      BoardBody(
        :me="me"
        :wdays="wdays"
        :tasks="tasks"
        :members="members"
      )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardHeader from '~/components/molecules/BoardHeader.vue'
import BoardBody from '~/components/molecules/BoardBody.vue'
import { difference } from 'lodash'
@Component({
  components: {
    BoardHeader,
    BoardBody,
  },
})
export default class TheBoard extends Vue {
  @Prop(Number) begginingWeekday: number
  @Prop(Array) holidayWeekdays: Array<number>
  @Prop(Object) me
  @Prop(Array) members: Array<object>
  @Prop(Array) tasks: Array<object>
  get wdays() {
    const wdays: Array<number> = []
    for (let i = 0; i < 7; i++) {
      let wday: number = this.begginingWeekday + i
      if (wday >= 7) {
        wday -= 7
      }
      wdays.push(wday)
    }
    return difference(wdays, this.holidayWeekdays)
  }
}
</script>

<style scoped lang="sass">
.board
  border-right: 5px solid $border-color
  width: 100%
</style>
