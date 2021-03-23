import {
    watch,
    nextTick,
    onMounted,
    onBeforeUnmount,
    getCurrentInstance,
    ComponentInternalInstance
} from 'vue'
import * as echarts from 'echarts'

interface EchartsProps {
    options: echarts.EChartsOption
    autoResize?: boolean
}

export default function useEcharts(props: EchartsProps) {
    let vm: ComponentInternalInstance

    let echartsInstance: echarts.EChartsType
    let chartEl: HTMLElement

    function initEChart (options: echarts.EChartsOption) {
        if (echartsInstance) {
            return
        }
        echartsInstance = echarts.init(chartEl)
        echartsInstance.setOption(options || {}, true)
    }

    // 开启深度监听，如变更 options.title 等的值也能重绘...
    const stopWatch = watch(() => props.options, (newOpt, oldOpt) => {
        if (!echartsInstance && newOpt) {
            initEChart(newOpt)
        } else {
            echartsInstance.setOption(newOpt, newOpt !== oldOpt)
        }
    }, {
        deep: true
    })
    onMounted(() => {
        nextTick(() => {
            vm = getCurrentInstance()!
        }).then(() => {
            // @ts-ignore
            chartEl = vm.proxy.$refs.echartsRef as HTMLElement
            initEChart(props.options)
        })
    })
    onBeforeUnmount(() => {
        stopWatch()
    })
    return {}
}
