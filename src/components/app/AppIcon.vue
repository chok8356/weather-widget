<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    :class="classes"
    :style="{
      width: size,
      height: 'auto'
    }"
    @click="$emit('click', $event)"
    v-html="require(`@/assets/icons/${name}.svg`)" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppIcon extends Vue {
  @Prop({ type: String, required: true }) readonly name!: string
  @Prop({ type: String, default: '1rem' }) readonly size!: string

  get classes() {
    return [
      'ww-icon'
    ]
  }
}
</script>

<style lang="scss" scoped>
@include b(icon) {
  align-items: center;
  color: currentColor;
  display: inline-flex;
  justify-content: center;
  line-height: 1;
  user-select: none;
  white-space: nowrap;

  &::v-deep svg {
    color: inherit;
    fill: none;
    height: 100%;
    width: 100%;
  }
}
</style>
