import {
    watch,
    onMounted,
    onBeforeUnmount,
    getCurrentInstance,
    ComponentInternalInstance
} from 'vue'
import * as echarts from 'echarts'
import { throttle } from '../../utils/util'

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

    // watch the options' changes to call the callback
    const stopWatch = watch(() => props.options, (newOpt, oldOpt) => {
        if (!echartsInstance && newOpt) {
            initEChart(newOpt)
        } else {
            echartsInstance.setOption(newOpt, newOpt !== oldOpt)
        }
    })

    // 监听 window resize
    const listenResize = throttle(() => {
        echartsInstance.setOption(props.options, false)
    }, 200)

    onMounted(() => {
        vm = getCurrentInstance()!
        // @ts-ignore
        chartEl = vm.proxy.$refs.echartsRef as HTMLElement
        initEChart(props.options)
        window.addEventListener('resize', listenResize)
    })
    onBeforeUnmount(() => {
        stopWatch()
        window.removeEventListener('resize', listenResize)
    })
    return {}
}
