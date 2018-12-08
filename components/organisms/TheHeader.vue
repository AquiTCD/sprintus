<template lang="pug">
  header.the_header
    vs-navbar(v-model="activeItem" class="nabarx")
     vs-button(type="flat" radius="50%" icon="menu")
     vs-navbar-title Sprintus
     vs-navbar-item(index="0")
       a(href="#") Home
     vs-navbar-item(index="1")
       a(href="#") News
     vs-navbar-item(index="2")
       a(href="#") Update
     vs-spacer
     vs-input(icon="search" placeholder="Search" v-model="search")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Headerbrand from '~/components/atoms/HeaderSiteTitle.vue'
// import HeaderContentTitle from '~/components/atoms/HeaderContentTitle.vue'
@Component({
  components: {
    // HeaderSiteTitle,
    // HeaderContentTitle,
  },
})
export default class TheHeader extends Vue {
  // @Prop(Object) site!: object
  // @Prop(Object) page!: object
}
</script>

<style scoped lang="stylus">
.the_header
  align-items: flex-end
  display: flex
  flex-direction: column
  width: 100%
</style>
