<template>
  <div class="v-echarts" ref="echartsContainer"></div>
</template>

<script lang="ts">
import echarts, { EChartsType } from 'echarts/lib/echarts'
import { EChartsFullOption } from 'echarts/lib/option'
import { getCurrentInstance, onMounted } from 'vue'

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
      // console.log(ctx.$refs)
      const container = refs.echartsContainer
      echartsInstance = echarts.init(container)
      echartsInstance.setOption(props.option)
    })
    // watchEffect(() => {
    //   if (props.option) {
    //     echartsInstance.setOption(props.option)
    //   }
    // })
  }
}
</script>

<style scoped>
.v-echarts {
  width: 100%;
  height: 100%;
}
</style>
