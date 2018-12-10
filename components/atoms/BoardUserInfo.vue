<template lang="pug">
  td.user
    img.avatar(:src="avatarUrl")
    p {{me.name}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class BoardUserInfo extends Vue {
  @Prop(Object) me
  get avatarUrl() {
    if (!this.me.avatar) {
      return 'https://pbs.twimg.com/profile_images/983688001581531138/OEkUPmHv_400x400.jpg'
    } else {
      return this.me.avatar
    }
  }
}
</script>

<style scoped lang="stylus">
.avatar
  border-radius: 28px
  height: 56px
  width: 56px
</style>
