<template lang="pug">
  td
    ul.list_narrow
      BoardUserTask(
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        v-if="tasks")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardUserTask from '~/components/atoms/BoardUserTask.vue'
@Component({
  components: {
    BoardUserTask,
  },
})
export default class BoardUserTasks extends Vue {
  @Prop(Array) tasks
}
</script>

<style scoped lang="sass">
.list_narrow
  list-style: none
  list-style-type: none
  margin-top: 8px
  margin-bottom: 8px
  margin-left: 8px
</style>
