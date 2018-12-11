<template lang="pug">
  div.event
    div.user
      vs-avatar(:size="avatarSize" :src="avatarUrl" v-if="event.user.avatar")
      vs-avatar(:size="avatarSize" :text="event.user.name" v-else)
      p.name {{event.user.name}}
    p.line {{event.line}}
    p.timestamp {{ this.event.createdAt.toDate() | toDatetimeMMDDHHMM }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyInfo from '~/components/atoms/MyInfo.vue'
import MyMonologue from '~/components/atoms/MyMonologue.vue'
@Component
export default class Me extends Vue {
  @Prop(Object) event?
  avatarSize = '48px'
}
</script>

<style scoped lang="stylus">
.event
  padding: 7px
.user
  align-items: center
  display: flex
  flex-direction: row
  justify-content: start
  width: 100%
.name
  font-weight: bold
  line-height: 1.25em
  padding-left: 13px
.line
  line-height: 1.2
  padding: 7px
.timestamp
  align-self: flex-end
  font-size: 0.8em
  text-align: right
</style>
