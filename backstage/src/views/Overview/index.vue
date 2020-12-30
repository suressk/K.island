<template>
  <section class="overview">
    <v-echarts class="echarts-demo" :option="option" />
  </section>
</template>

<script lang="ts">
import VueEcharts from '@/components/VueEcharts.vue'
import 'echarts/lib/chart/bar'

const option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
}

export default {
  name: 'Overview',
  components: {
    'v-echarts': VueEcharts
  },
  setup () {
    // setTimeout(() => {
    //   option = {
    //     title: {
    //       text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     xAxis: {
    //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [{
    //       name: '销量',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //     }]
    //   }
    // }, 5000)
    return { option }
  }
}
</script>

<style scoped>
.echarts-demo {
  width: 500px;
  height: 400px;
}
</style>
