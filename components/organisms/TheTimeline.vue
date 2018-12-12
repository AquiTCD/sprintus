<template lang="pug">
  div
    Me(:me="me")
    TimelineEvent(v-for="event in events"
      :event="event"
      :key="event.id")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Me from '~/components/molecules/Me.vue'
import TimelineEvent from '~/components/atoms/TimelineEvent.vue'
@Component({
  components: {
    Me,
    TimelineEvent,
  },
})
export default class TheTimeline extends Vue {
  @Prop(Object) me?
  @Prop(Array) events?: Object
}
</script>

<style scoped lang="sass">
</style>
