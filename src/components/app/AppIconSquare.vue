<template>
  <div
    class="ww-app-icon-square"
    @click="$emit('click', $event)">
    <AppIcon v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppIcon from '@/components/app/AppIcon.vue'

@Component({
  components: {
    AppIcon
  }
})
export default class AppIconSquare extends Vue {
}
</script>

<style lang="scss" scoped>
@include b(app-icon-square) {
  align-items: center;
  background-color: $color-white;
  border-radius: 0.5rem;
  display: inline-flex;
  justify-content: center;
  line-height: 1;
  padding: 0.5rem;
  user-select: none;
  white-space: nowrap;
  width: auto;
}
</style>
