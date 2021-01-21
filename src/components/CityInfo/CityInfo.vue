<template>
  <div
    v-if="forecast"
    class="ww-city-info">
    <CityInfoDetail
      class="ww-city-info__info"
      :forecast="forecast"
      @change-view="$emit('change-view')" />
    <CityInfoMain
      class="ww-city-info__props"
      :info="mainInfo" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CityInfoDetail from './CityInfoDetail.vue'
import CityInfoMain from './CityInfoMain.vue'
import { WeatherForecast } from '@/types/WeatherForecast/WeatherForecast'
import { ICityInfoMainValueItem } from './CityInfoMain.type'

@Component({
  components: {
    CityInfoDetail,
    CityInfoMain
  }
})
export default class CityInfo extends Vue {
  @Prop(Object) forecast!: WeatherForecast

  get mainInfo(): ICityInfoMainValueItem[] {
    if (!this.forecast) return []
    const cloudiness = `${this.forecast.cloudiness}%`
    const humidity = `${this.forecast.humidity}%`
    const windSpeed = `${this.forecast.windSpeed}m/s`
    const pressure = `${this.forecast.pressure}hPa`
    return [
      {
        value: cloudiness,
        icon: 'cloud'
      },
      {
        value: humidity,
        icon: 'droplet'
      },
      {
        value: windSpeed,
        icon: 'wind'
      },
      {
        value: pressure,
        icon: 'clock'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
@include b(city-info) {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  @include e(info) {
    height: 100%;
    padding-bottom: 3rem !important;
  }

  @include e(props) {
    margin-top: -1rem;
  }
}
</style>
