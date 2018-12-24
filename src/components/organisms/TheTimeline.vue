<template lang="pug">
  div
    TimelineEvent.timeline_event(v-for="event in events"
      :event="event"
      :key="event.id")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import TimelineEvent from '~/components/atoms/TimelineEvent.vue'
@Component({
  components: {
    TimelineEvent,
  },
})
export default class TheTimeline extends Vue {
  @Prop(Array) events?: Object
}
</script>

<style scoped lang="sass">
.my_line
  border-bottom: $border-color solid 3px
.timeline_event
  border-bottom: $border-color solid 1px
</style>
