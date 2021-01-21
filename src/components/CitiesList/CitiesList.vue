<template>
  <div class="ww-cities-list">
    <!-- header -->
    <div class="ww-cities-list-header">
      <div
        class="ww-cities-list-header__icon"
        @click="goBack">
        <AppIconSquare
          size="1rem"
          name="arrow-left" />
      </div>
      <div class="ww-cities-list-header__title">
        Locations
      </div>
      <div
        class="ww-cities-list-header__icon"
        :class="{
          'is-active': isEdit
        }"
        @click="isEdit = !isEdit">
        <AppIconSquare
          size="1rem"
          :name="isEdit ? 'close' : 'edit'" />
      </div>
    </div>

    <div class="ww-cities-list__content">
      <!-- search -->
      <CitiesListSearch
        v-if="isEdit"
        class="ww-cities-list-items-group ww-cities-list-items-group--search"
        :exclude-list-ids="excludeListIds"
        @add="addItem" />

      <!-- selected -->
      <div
        ref="items"
        class="ww-cities-list-items-group ww-cities-list-items-group--selected">
        <div class="ww-cities-list-items-group__title">
          Your locations
        </div>
        <div class="ww-cities-list-items-group__content">
          <draggable
            v-model="forecastsLocal"
            class="ww-cities-list__items"
            tag="div"
            v-bind="dragOptions">
            <transition-group
              type="transition"
              name="flip-list">
              <template v-for="(forecast, index) in forecastsLocal">
                <CitiesListItem
                  :key="index"
                  class="ww-cities-list-item--cities-list"
                  :class="{
                    'is-edit': isEdit,
                    'is-active': forecast.location.id === syncedCurrentForecastId
                  }"
                  :forecast="forecast"
                  @click.capture="selectItem(forecast.location.id)">
                  <template
                    v-if="isEdit"
                    #icon>
                    <AppIcon
                      size="1rem"
                      name="drag" />
                  </template>
                  <template
                    v-if="isEdit"
                    #temperature>
                    <AppIcon
                      class="ww-cities-list-item__delete"
                      size="1.25rem"
                      name="trash"
                      @click.stop="deleteItem(index, forecast.location.id)" />
                  </template>
                </CitiesListItem>
              </template>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, PropSync, Watch } from 'vue-property-decorator'
import { WeatherForecast } from '@/types/WeatherForecast/WeatherForecast'
import AppIcon from '@/components/app/AppIcon.vue'
import AppIconSquare from '@/components/app/AppIconSquare.vue'
import CitiesListItem from './CitiesListItem.vue'
import CitiesListSearch from './CitiesListSearch.vue'

import draggable from 'vuedraggable'

import cloneDeep from 'lodash/cloneDeep'

@Component({
  components: {
    AppIcon,
    AppIconSquare,
    CitiesListItem,
    CitiesListSearch,
    draggable
  }
})
export default class CitiesList extends Vue {
  @Model('change', { type: Array, default: () => [] }) forecasts!: WeatherForecast[]
  @PropSync('currentForecastId', Number) syncedCurrentForecastId!: number | null

  isEdit = false

  forecastsLocal = cloneDeep(this.forecasts)

  get dragOptions() {
    return {
      animation: 100,
      group: 'ww-cities-list__items',
      disabled: !this.isEdit,
      dragClass: 'is-draggable',
      ghostClass: 'ww-cities-list__items-gost',
      handle: '.ww-cities-list-item__icon'
    }
  }

  get excludeListIds() {
    return this.forecastsLocal.map((el: WeatherForecast) => el.location.id)
  }

  get firstForecastId() {
    return this.forecastsLocal[0].location.id
  }

  @Watch('forecastsLocal', { immediate: true, deep: true })
  onChildChanged(value: WeatherForecast[]) {
    this.$emit('change', value)
  }

  deleteItem(index: number, id: number) {
    if (this.forecastsLocal?.length === 1) {
      this.syncedCurrentForecastId = this.firstForecastId
      return
    }

    this.$delete(this.forecastsLocal, index)
    this.$emit('delete', index, id)

    if (id === this.syncedCurrentForecastId) {
      this.syncedCurrentForecastId = this.firstForecastId
    }
  }

  selectItem(id: number) {
    if (this.isEdit) return
    this.$emit('select', id)
    this.goBack()
  }

  addItem(forcats: WeatherForecast) {
    this.forecastsLocal.push(forcats)
  }

  goBack() {
    this.$emit('back')
  }
}
</script>

<style lang="scss">
@include b(cities-list-item) {
  @include when(edit) {
    @include e(icon) {
      cursor: move !important;
    }
  }
}
</style>

<style lang="scss" scoped>
@include b(cities-list) {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  @include e(items-gost) {
    opacity: 0.5;
  }

  @include e(content) {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;

    @extend %scrollbar;
  }
}

@include b(cities-list-header) {
  align-items: center;
  display: flex;
  height: auto;
  height: 2rem;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 100%;

  @include e(title) {
    font-size: 0.9rem;
    font-weight: 600;
  }

  @include e(icon) {
    color: $color-icon;
    cursor: pointer;
    transition: color 100ms ease-in;

    &:hover {
      color: $color-primary;
    }

    @include when(active) {
      color: $color-primary;
    }
  }
}

@include b(cities-list-items-group) {
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  @include e(title) {
    display: flex;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    width: 100%;
  }
}

@include b(cities-list-item) {
  @include m(cities-list) {
    cursor: pointer;

    &:not(:last-of-type) {
      margin-bottom: 0.5rem;
    }

    @include e(delete) {
      color: $color-icon;
      cursor: pointer;

      &:hover {
        color: $color-primary;
      }
    }

    @include when(active) {
      &::v-deep {
        @include e(info) {
          color: $color-primary;
        }
      }
    }

    @include when(edit) {
      cursor: default;
    }
  }
}
</style>
