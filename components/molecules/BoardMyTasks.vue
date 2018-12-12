<template lang="pug">
  tr
    BoardUserInfo(:me="me")
    BoardUserTasksOfWday(
      v-for="tasksOfWday in tasksOfWdays"
      :tasks="tasksOfWday"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BoardUserInfo from '~/components/atoms/BoardUserInfo.vue'
import BoardUserTasksOfWday from '~/components/molecules/BoardUserTasksOfWday.vue'
@Component({
  components: {
    BoardUserInfo,
    BoardUserTasksOfWday,
  },
})
export default class BoardMyTasks extends Vue {
  @Prop(Object) me: object
  @Prop(Array) tasks: Array<object>
  get tasksOfWdays() {
    return this.tasks
  }
}
</script>

<style scoped lang="sass">
</style>
