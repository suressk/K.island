import { onMounted, onBeforeUnmount, getCurrentInstance, watch } from 'vue'
import * as echarts from 'echarts'

interface EchartsProps {
    options: echarts.EChartsOption
    autoResize?: boolean
}

export default function useEcharts(props: EchartsProps) {
    let vm

    let echartsInstance: echarts.EChartsType
    let chartEl: HTMLElement

    function initEChart (options: echarts.EChartsOption) {
        if (echartsInstance) {
            return
        }
        echartsInstance = echarts.init(chartEl)
        echartsInstance.setOption(options || {}, true)
    }

    const stopWatch = watch(() => props.options, (newOpt, oldOpt) => {
        if (!echartsInstance && newOpt) {
            initEChart(newOpt)
        } else {
            echartsInstance.setOption(newOpt, newOpt !== oldOpt)
        }
    })
    onMounted(() => {
        vm = getCurrentInstance()!
        // @ts-ignore
        chartEl = vm.proxy.$refs.echartsRef as HTMLElement
        initEChart(props.options)
    })
    onBeforeUnmount(() => {
        stopWatch()
    })
    return {}
}
