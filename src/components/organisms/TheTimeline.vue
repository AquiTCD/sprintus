<template lang="pug">
  div.timeline
    .timeline_event(v-for="event in events" :key="event.id")
      TimelineEvent(:event="event")
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
.timeline
  padding: 0.325rem 0.25rem
.timeline_event
  &:not(:last-of-type)
    padding-bottom: 0.25rem
</style>
