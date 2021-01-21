<template>
  <div
    id="ww-app"
    class="ww-app">
    <transition
      mode="out-in"
      :name="`slide-${isList ? 'left' :'right'}`">
      <CityInfo
        v-if="!isList"
        key="info"
        :forecast="selectedForecast"
        class="ww-app__info"
        @change-view="isList = true" />
      <CitiesList
        v-if="isList"
        key="list"
        v-model="forecasts"
        class="ww-app__list"
        :current-forecast-id.sync="currentForecastId"
        @select="(id) => currentForecastId = id"
        @back="isList = false" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import AppIcon from '@/components/app/AppIcon.vue'
import CityInfo from '@/components/CityInfo/CityInfo.vue'
import CitiesList from '@/components/CitiesList/CitiesList.vue'
import { WeatherForecast } from '@/types/WeatherForecast/WeatherForecast'
import { WeatherForecastClient } from '@/http/WeatherForecastClient'
import dayjs from '@/utils/dayjs'
import { setupFont } from '@/utils/fonts'
import { getCoords } from '@/utils/helpers'
import { LocalStorage } from '@/utils/localStorage'

const WFClient = new WeatherForecastClient()

@Component({
  components: {
    AppIcon,
    CityInfo,
    CitiesList
  }
})
export default class App extends Vue {
  @Provide() dayjs = dayjs

  isList = false

  forecasts: WeatherForecast[] = []
  currentForecastId: number | null = null

  get allForecastsIds() {
    return this.forecasts.map((el: WeatherForecast) => el.location.id)
  }

  get firstForecastId() {
    return this.forecasts[0].location.id
  }

  get selectedForecast() {
    return this.forecasts.find((el: WeatherForecast) => {
      const id = this.currentForecastId || this.firstForecastId
      return el.location.id === id
    })
  }

  @Watch('currentForecastId')
  onCurrentForecastIdChanged() {
    LocalStorage.setItem('currentForecastId', this.currentForecastId)
  }

  @Watch('forecasts')
  onForecastsChanged() {
    LocalStorage.setItem('allForecastsIds', this.allForecastsIds)
  }

  created() {
    setupFont('//fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap')
  }

  async mounted() {
    const allForecastsIds = LocalStorage.getItem('allForecastsIds')

    if (allForecastsIds) {
      this.forecasts = await this.getDataListByIds(allForecastsIds)
    } else {
      const position = await getCoords()
      this.forecasts = await this.getDataByPosition(position)
    }

    this.currentForecastId = this.getCurrentForecastIdFromStorage()
  }

  getCurrentForecastIdFromStorage() {
    const currentForecastId = LocalStorage.getItem('currentForecastId')
    return parseFloat(currentForecastId) || this.firstForecastId
  }

  async getDataByPosition(position: GeolocationPosition) {
    if (!position) return []
    const data = await WFClient.getDataByPosition(position)
    return [new WeatherForecast(data)]
  }

  async getDataListByIds(ids: string) {
    if (!ids) return []
    const data = await WFClient.getDataListByIds(ids)
    const result = []
    if (data && data.length) {
      for (const value of data) {
        result.push(new WeatherForecast(value))
      }
    }
    return result
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/transitions.scss";

// Temp styles for test
body {
  background-color: #e4eaf8;
  padding: 2rem;
}

// Global styles
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#ww-app {
  color: $color-black;
  font-family: $font-family;
  font-size: $font-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: normal;
  overflow: hidden;
}

@include b(app) {
  align-items: flex-start;
  background-color: $color-bg-app;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 2rem -1rem rgba(0, 0, 0, 0.25), 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 21rem;
  justify-content: flex-start;
  padding: 0.75rem;
  position: relative;
  width: 24rem;
}
</style>
