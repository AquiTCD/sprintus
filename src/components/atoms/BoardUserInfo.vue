<template lang="pug">
  td
    .user
      figure.avatar.avatar-xl.member-avatar(:data-initial="member.name | toInitialName" :class="{hasAvatar: member.avatarUrl}")
        img(:src="member.avatarUrl" v-if="member.avatarUrl")
      p.name {{member.name}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
@Component
export default class BoardUserInfo extends Vue {
  @Prop(String) memberId: string
  @Getter getMemberById
  get member() {
    return this.getMemberById(this.memberId)
  }
}
</script>

<style scoped lang="sass">
.user
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 13px 5px
.member-avatar
  background-color: $gray-color
  &.hasAvatar
    background-color: transparent
.name
  font-weight: bold
  padding-top: 5px
  margin-bottom: 0
</style>
