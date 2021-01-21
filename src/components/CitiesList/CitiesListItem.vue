<template>
  <div
    v-if="forecast"
    class="ww-cities-list-item"
    @click="$emit('click', $event)">
    <!-- icon -->
    <div class="ww-cities-list-item__icon">
      <slot name="icon">
        <AppIcon
          size="1rem"
          :name="forecast.weatherIcon" />
      </slot>
    </div>

    <!-- info -->
    <div class="ww-cities-list-item__info">
      {{ forecast.location.name }}, <i>{{ forecast.location.country }}</i>
    </div>

    <!-- temperature -->
    <div
      class="ww-cities-list-item__temperature">
      <slot name="temperature">
        <i>
          {{ forecast.temperature }}
          <span>&deg;</span>
        </i>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { WeatherForecast } from '@/types/WeatherForecast/WeatherForecast'
import AppIcon from '@/components/app/AppIcon.vue'

@Component({
  components: {
    AppIcon
  }
})
export default class CitiesListItem extends Vue {
  @Prop(Object) forecast!: WeatherForecast
}
</script>

<style lang="scss" scoped>
@include b(cities-list-item) {
  align-items: center;
  background-color: $color-white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.25rem -0.35rem rgba(0, 0, 0, 0.1);
  color: $color-black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  transition: background-color 50ms ease-in;
  width: 100%;

  @include e(icon) {
    align-items: center;
    background-color: $color-bg-app;
    border-radius: 0.5rem;
    display: inline-flex;
    height: 2rem;
    justify-content: center;
    margin-right: 1rem;
    min-height: 2rem;
    min-width: 2rem;
    padding: 0.25rem;
    width: 2rem;
  }

  @include e(info) {
    color: inherit;
    display: inline-block;
    flex-grow: 1;
    font-weight: 500;
    height: auto;
    width: auto;

    i {
      color: #d1d1d4;
      font-style: normal;
      font-weight: normal;
    }

    @extend %text-hide;
  }

  @include e(temperature) {
    align-items: center;
    color: inherit;
    display: inline-flex;
    font-size: 1.25rem;
    font-weight: 600;
    height: auto;
    justify-content: center;
    margin: 0 0.85rem;
    width: auto;

    i {
      font-style: normal;
      position: relative;
    }

    span {
      font-size: 1.25rem;
      position: absolute;
      right: -1px;
      top: -1px;
      transform: translateX(100%);
    }
  }
}
</style>
