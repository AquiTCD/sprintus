<template lang="pug">
  td.user
    vs-avatar(:size="avatarSize" :src="me.avatar" v-if="me.avatar")
    vs-avatar(:size="avatarSize" :text="me.name" v-else)
    p.name {{me.name}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class BoardUserInfo extends Vue {
  @Prop(Object) me
  avatarSize = '48px'
}
</script>

<style scoped lang="stylus">
.avatar
  border-radius: 28px
  height: 56px
  width: 56px
.name
  padding: 3px 5px 13px
</style>
