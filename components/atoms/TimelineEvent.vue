<template lang="pug">
  div.event
    div.user
      img.avatar(:src="avatarUrl")
      div.info
        p.name {{event.user.name}}
        p.timestamp {{ this.event.createdAt.toDate() | toDatetimeMMDDHHMM }}
    p.line {{event.line}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyInfo from '~/components/atoms/MyInfo.vue'
import MyMonologue from '~/components/atoms/MyMonologue.vue'
@Component
export default class Me extends Vue {
  @Prop(Object) event?
  get avatarUrl() {
    if (!this.event.user.avatar) {
      return 'https://pbs.twimg.com/profile_images/983688001581531138/OEkUPmHv_400x400.jpg'
    } else {
      return this.event.user.avatar
    }
  }
}
</script>

<style scoped lang="stylus">
.event
  padding: 7px
.user
  align-items: flex-start
  display: flex
  flex-direction: row
  width: 100%
.avatar
  border-radius: 28px
  height: 56px
  width: 56px
.info
  padding-left: 13px
.name
  align-self: flex-start
  font-weight: bold
  line-height: 1.25em
.timestamp
  align-self: flex-end
  font-size: 0.8em
  line-height: 1.25em
  text-align: right
</style>
