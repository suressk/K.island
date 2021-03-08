<template>
  <div class="v-echarts" ref="echartsRef" />
</template>

<script lang="ts">
import { PropsType } from './echartsTypes'
import useEcharts from './echarts'

export default {
  name: 'VueEcharts',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props: PropsType) {
    useEcharts(props)
  }
}
</script>

<style lang="scss">
.v-echarts {
  width: 100%;
  height: 100%;
}
</style>
