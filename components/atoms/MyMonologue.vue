<template lang="pug">
  div
    textarea.form-input#input-example-3(placeholder="Textarea" rows="3")
    button.btn.btn-primary Post
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class MyMonologue extends Vue {}
</script>

<style scoped lang="sass">
</style>
