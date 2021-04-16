<template>
  <div class="overview flex-col-start">
    <h3 class="primary-title">Overview</h3>

    <div class="card-container flex-between">
      <div class="card-item"></div>
      <div class="card-item"></div>
      <div class="card-item"></div>
    </div>

    <div class="chart-container flex-between">
      <div class="chart-item">
        <v-chart :options="barOption"/>
      </div>
      <div class="chart-item">
        <v-chart :options="lineOption"/>
      </div>
      <div class="chart-item">
        <v-chart :options="pieOption"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import VueEcharts from '/@comp/VueEcharts/index.vue'
import {barOption, lineOption, pieOption} from './useOverview'
import 'default-passive-events'

export default defineComponent({
  name: "Overview",
  components: {
    'v-chart': VueEcharts
  },
  setup() {
    return {
      barOption,
      lineOption,
      pieOption
    }
  }
})
</script>

<style lang="scss">
.overview {
  height: 100%;
  width: 100%;

  .card-container {
    height: 400px;
    width: 100%;
  }
  .chart-container {
    height: calc(100% - 450px);
    width: 100%;
  }
  .card-item,
  .chart-item {
    border-radius: 10px;
    height: 90%;
    width: 30%;
    transition: all .3s ease;
    border: 1px solid var(--border);
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
      border-color: transparent;
      box-shadow: 0 0 10px var(--opacity-cyan-3);
    }
  }

  .chart-item {

  }
}
</style>
