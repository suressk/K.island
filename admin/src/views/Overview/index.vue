<template>
  <div class="overview flex-col-start">
    <h3 class="primary-title">Overview</h3>

    <div class="chart-container flex-around">
      <div class="chart-item">
        <v-chart :options="barOption" />
      </div>
      <div class="chart-item">
        <v-chart :options="lineOption" />
      </div>
      <div class="chart-item">
        <v-chart :options="pieOption" />
      </div>
    </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueEcharts from '/@comp/VueEcharts/index.vue'
import { barOption, lineOption, pieOption } from './useOverview'


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
  .chart-container {
    flex: 1;
    width: 100%;
  }
  .chart-item {
    width: 30%;
    height: 50%;
  }
}
</style>
