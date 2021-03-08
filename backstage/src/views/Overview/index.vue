<template>
  <section class="overview flex-around">
    <v-echarts class="echarts-item" :options="barOption" />
    <v-echarts class="echarts-item" :options="lineOption" />
    <v-echarts class="echarts-item" :options="pieOption" />
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
  .echarts-item {
    margin: 10px 20px;
    width: 30%;
    height: 30%;
  }
}
</style>
