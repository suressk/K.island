<template>
  <section class="overview flex-around">
    <v-echarts class="echarts-item" :option="barOption" />
    <v-echarts class="echarts-item" :option="lineOption" />
    <v-echarts class="echarts-item" :option="pieOption" />
  </section>
</template>

<script lang="ts">
import VueEcharts from '@/components/VueEcharts.vue'
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
