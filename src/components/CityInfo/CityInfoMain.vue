<template>
  <div class="ww-city-info-props">
    <template v-for="(item, index) in info">
      <div
        :key="index"
        class="ww-city-info-props__item">
        <div class="ww-city-info-props__item-icon">
          <AppIcon :name="item.icon" />
        </div>
        <div class="ww-city-info-props__item-value">
          {{ item.value }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import AppIcon from '@/components/app/AppIcon.vue'

import { ICityInfoMainValueItem } from './CityInfoMain.type'

@Component({
  components: {
    AppIcon
  }
})
export default class CityInfoMain extends Vue {
  @Prop(Array) info!: ICityInfoMainValueItem[]
}
</script>

<style lang="scss" scoped>
@include b(city-info-props) {
  align-items: center;
  background-color: $color-white;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 1rem -0.35rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: -1rem;
  padding: 0.75rem 0;
  width: 100%;
  z-index: 1;

  @include e(item) {
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    width: auto;
  }

  @include e(item-icon) {
    align-items: center;
    color: $color-primary;
    display: inline-flex;
    justify-content: center;
    margin-bottom: 0.25rem;
    width: auto;

    & > * {
      width: 1.25rem !important;
    }
  }

  @include e(item-value) {
    font-size: 0.75rem;
    font-weight: 600;
    text-align: center;
  }
}
</style>
