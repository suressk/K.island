<template>
  <div class="v-echarts" ref="echartsRef" />
</template>

<script lang="ts">
import { SetupContext } from '@vue/runtime-core'
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
  setup (props: PropsType, ctx: SetupContext) {
    useEcharts(props, ctx)
  }
}
</script>

<style lang="scss">
.v-echarts {
  width: 100%;
  height: 100%;
}
</style>
