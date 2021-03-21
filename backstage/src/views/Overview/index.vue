<template>
  <section class="overview flex-between">
    <div class="overview-card">
      <v-echarts class="echarts-item" :options="barOption" />
    </div>
    <div class="overview-card">
      <v-echarts class="echarts-item" :options="lineOption" />
    </div>
    <div class="overview-card">
      <v-echarts class="echarts-item" :options="pieOption" />
    </div>
  </section>
</template>

<script lang="ts">
import VueEcharts from '@/components/VueEcharts/index.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import { barOption, lineOption, pieOption } from './overview'

export default {
  name: 'Overview',
  components: {
    'v-echarts': VueEcharts
  },
  setup () {
    return { barOption, lineOption, pieOption }
  }
}
</script>

<style lang="scss">
.overview {
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-start;
  .overview-card {
    width: 30%;
    height: 30%;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    border-radius: 10px;
    margin: 1%;
    .echarts-item {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
