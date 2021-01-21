<template>
  <div class="ww-cities-list-search">
    <!-- input search -->
    <AppInput
      class="ww-cities-list-search__input"
      placeholder="Enter city name"
      :value="query"
      @input="onInput" />

    <div
      v-if="query.length && !findedForecasts.length"
      class="ww-cities-list-search__nothing-found">
      Nothing found
    </div>

    <template v-if="findedForecasts && findedForecasts.length">
      <!-- title -->
      <div class="ww-cities-list-search__title">
        Finded locations
      </div>

      <!-- finded items -->
      <div
        class="ww-cities-list-search__items">
        <transition-group
          type="transition"
          name="flip-list">
          <template v-for="(forecast, index) in findedForecasts">
            <CitiesListItem
              :key="index"
              class="ww-cities-list-search__item"
              :forecast="forecast">
              <template
                #temperature>
                <AppIcon
                  class="ww-cities-list-search__item-add"
                  size="1.25rem"
                  name="plus-square"
                  @click.stop="addItem(forecast)" />
              </template>
            </CitiesListItem>
          </template>
        </transition-group>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { WeatherForecast } from '@/types/WeatherForecast/WeatherForecast'
import { WeatherForecastClient } from '@/http/WeatherForecastClient'
import AppIcon from '@/components/app/AppIcon.vue'
import AppInput from '@/components/app/AppInput.vue'
import CitiesListItem from './CitiesListItem.vue'

import { Debounce } from '@/utils/decorators'

const WFClient = new WeatherForecastClient()

@Component({
  components: {
    AppIcon,
    AppInput,
    CitiesListItem
  }
})
export default class CitiesListSearch extends Vue {
  @Prop({ type: Array, default: () => [] }) excludeListIds!: number[]
  findedForecasts: WeatherForecast[] = []

  query = ''

  onInput(q: string) {
    this.query = q

    if (!this.query) {
      this.findedForecasts = []
      return
    }

    this.getDataListByQuery(this.query)
  }

  @Debounce(250)
  async getDataListByQuery(q: string) {
    const result: WeatherForecast[] = []
    let list = await WFClient.getDataListByQuery(q)
    if (!list) return result

    list = list.filter((el: WeatherForecastApi.IRootObject) => !this.excludeListIds.includes(el.id))

    for (const item of list) {
      result.push(new WeatherForecast(item))
    }

    this.findedForecasts = result
  }

  addItem(forecast: WeatherForecast) {
    this.onInput('')
    this.$emit('add', forecast)
  }
}
</script>

<style lang="scss" scoped>
@include b(cities-list-search) {
  display: flex;
  flex-direction: column;

  @include e(title) {
    display: flex;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    width: 100%;
  }

  @include e(nothing-found) {
    display: flex;
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
    width: 100%;
  }

  @include e(items) {
    overflow-x: hidden;
    overflow-y: auto;

    @extend %scrollbar;
  }

  @include e(item) {
    &:not(:last-of-type) {
      margin-bottom: 0.5rem;
    }

    @include when(edit) {
      cursor: default;
    }
  }

  @include e(item-add) {
    color: $color-icon !important;
    cursor: pointer;

    &:hover {
      color: $color-primary !important;
    }
  }
}
</style>
