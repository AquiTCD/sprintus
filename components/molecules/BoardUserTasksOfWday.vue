<template lang="pug">
  td
    ul
      BoardUserTask(
        v-for="task in tasks"
        :key="task.id"
        :task="task")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardUserTask from '~/components/atoms/BoardUserTask.vue'
@Component({
  components: {
    BoardUserTask,
  },
})
export default class BoardUserTasksOfWday extends Vue {
  @Prop(Object) me: object
  @Prop(Array) tasks: Array<object>
}
</script>

<style scoped lang="sass">
ul
  list-style: none
  list-style-type: none
</style>
