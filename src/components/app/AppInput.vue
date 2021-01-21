<template>
  <div class="ww-app-input">
    <input
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="onInput($event.target.value)">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'

@Component
export default class AppInput extends Vue {
  @Model('input', { type: String, default: '' }) readonly value!: string
  @Prop(String) placeholder!: string

  onInput(value: string) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" scoped>
@include b(app-input) {
  display: flex;
  width: 100%;

  input {
    border: 1px solid $color-grey;
    border-radius: 0.25rem;
    display: flex;
    font: 400 0.8rem $font-family;
    outline: none;
    padding: 0.75rem;
    width: 100%;

    &::placeholder {
      color: $color-placeholder;
      font: inherit;
    }
  }
}
</style>
