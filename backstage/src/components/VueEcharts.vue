<template>
  <div class="v-echarts" ref="echartsContainer"></div>
</template>

<script lang="ts">
import echarts, { EChartsType } from 'echarts/lib/echarts'
import { EChartsFullOption } from 'echarts/lib/option'
import { getCurrentInstance, onMounted, watch } from 'vue'

export default {
  name: 'VueEcharts',
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props: { option: EChartsFullOption }) {
    let echartsInstance: EChartsType
    onMounted(() => {
      /* eslint-disable */
      // @ts-ignore
      const { refs } = getCurrentInstance()
      const container = refs.echartsContainer
      echartsInstance = echarts.init(container)
      // echartsInstance.setOption(props.option)
    })
    watch(() => props.option, opt => {
      echartsInstance.setOption(opt)
    })
  }
}
</script>

<style scoped>
.v-echarts {
  width: 100%;
  height: 100%;
}
</style>
