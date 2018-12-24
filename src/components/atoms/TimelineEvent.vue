<template lang="pug">
  div.event
    div.user
      figure.avatar.member-avatar(:data-initial="member.name | toInitialName" :class="{hasAvatar: member.avatarUrl}")
        img(:src="member.avatarUrl" v-if="member.avatarUrl")
      p.name {{member.name}}
    p.line {{event.line}}
    .timestamp
      time {{ this.event.createdAt.toDate() | toDatetimeMMDDHHMM }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
@Component
export default class TimelineEvent extends Vue {
  @Prop(Object) event?
  @Getter getMemberById
  get member() {
    return this.getMemberById(this.event.memberId)
  }
}
</script>

<style scoped lang="sass">
.event
  padding: 8px
.user
  display: flex
  flex-direction: row
  align-items: center
  justify-content: left
  width: 100%
  padding: 0 8px
.member-avatar
  background-color: $gray-color
  &.hasAvatar
    background-color: transparent
.name
  align-self: flex-start
  font-weight: bold
  padding-left: 13px
  margin-bottom: 0
.line
  padding: 8px
  font-size: 0.8em
  margin-bottom: 0
.timestamp
  font-size: 0.8em
  margin-bottom: 0
  text-align: right
  color: $gray-color-dark
</style>
