<template>
  <div class="ww-city-info-detail">
    <div
      class="ww-city-info-detail__change-view"
      @click="$emit('change-view')">
      <AppIcon
        size="1.5rem"
        name="list" />
    </div>

    <!-- date -->
    <div class="ww-city-info-detail__date">
      {{ dayjs().format('LLLL') }}
    </div>

    <!-- city -->
    <div class="ww-city-info-detail__city">
      <b>{{ forecast.location.name }}</b>, {{ forecast.location.country }}
    </div>

    <!-- temperature -->
    <div class="ww-city-info-detail__temperature">
      <b>
        {{ forecast.temperature }}
        <span>&deg;C</span>
      </b>
    </div>

    <!-- description -->
    <div
      v-if="forecast.description"
      class="ww-city-info-detail__description">
      {{ forecast.description }}
    </div>

    <!-- icon -->
    <div class="ww-city-info-detail__icon">
      <AppIcon :name="forecast.weatherIcon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'
import { WeatherForecast } from '@/types/WeatherForecast/WeatherForecast'
import AppIcon from '@/components/app/AppIcon.vue'

@Component({
  components: {
    AppIcon
  }
})
export default class CityInfoDetail extends Vue {
  @Prop(Object) forecast!: WeatherForecast

  @Inject() readonly dayjs!: void
}
</script>

<style lang="scss" scoped>
@include b(city-info-detail) {
  background: $color-bg-info-detail-dark;
  background: linear-gradient(90deg, $color-bg-info-detail-dark, $color-bg-info-detail-light);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1.25rem;
  position: relative;
  width: 100%;

  @include e(change-view) {
    align-items: center;
    color: $color-white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: absolute;
    right: 1.25rem;
    top: 1.25rem;
    transition: color 100ms ease-in;
    z-index: 1;

    &:hover {
      color: $color-primary;
    }
  }

  @include e(date) {
    color: $color-white;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  @include e(city) {
    color: $color-white;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  @include e(temperature) {
    color: $color-white;
    font-size: 4rem;
    width: 100%;

    b {
      position: relative;
    }

    span {
      font-size: 0.9rem;
      position: absolute;
      right: 0;
      top: 4px;
      transform: translateX(100%);
    }
  }

  @include e(description) {
    color: $color-white;
    font-size: 1rem;
    text-transform: lowercase;
    width: 100%;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  @include e(icon) {
    display: inline-flex;
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: auto;

    & > * {
      width: 8rem !important;
    }
  }
}
</style>
