<template lang="pug">
footer.the_footer
  //- BackButton.backbutton(
  //-   v-if="page.parent"
  //-   :parent="page.parent")
  //- Copyright.copyright(
  //-   :auther="site.auther"
  //-   :published="site.published"
  //-   :updated="site.updated")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// import BackButton from '~/components/atoms/BackButton.vue'
// import Copyright from '~/components/atoms/Copyright.vue'
@Component({
  // components: {
  // BackButton,
  // Copyright,
  // },
})
export default class TheFooter extends Vue {
  // @Prop(Object) site!: object
  // @Prop(Object) page!: object
}
</script>

<style scoped lang="sass">
.the_footer
  align-items: flex-end
  display: flex
  flex-direction: column
  padding-bottom: 3rem
  width: 100%
</style>
