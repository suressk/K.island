import { onMounted, getCurrentInstance, watch } from 'vue'
import echarts, { EChartsType } from 'echarts/lib/echarts'
import { PropsType } from './echartsTypes'
import { ComponentInternalInstance } from '@vue/runtime-core'
import { EChartsFullOption } from 'echarts/lib/option'

export default function useEcharts (props: PropsType) {
  let echartsInstance: EChartsType
  /* eslint-disable */
  // @ts-ignore
  let vm: ComponentInternalInstance
  // @ts-ignore
  let chartEl: HTMLElement
  /**
   * echarts 初始化
   * */
  function init (options: EChartsFullOption) {
    if (echartsInstance) {
      return
    }
    echartsInstance = echarts.init(chartEl)
    echartsInstance.setOption(options || {}, true)
  }

  onMounted(() => {
    // @ts-ignore
    vm = getCurrentInstance()
    // @ts-ignore
    chartEl = vm.refs.echartsRef
    init(props.options)
  })

  // 监听 options 变化
  watch(() => props.options, (opt, oldOpt) => {
    if (!echartsInstance && opt) {
      init(opt)
    } else {
      echartsInstance.setOption(opt, opt !== oldOpt)
    }
  })
}
