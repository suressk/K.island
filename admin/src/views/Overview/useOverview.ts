import { ref, reactive, toRefs, Ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getOverviewData } from '../../api/api'
import { errorNotify, warningNotify } from '../../utils'
import { EChartsOption } from 'echarts'
import { M_SET_UNREAD } from '../../store/mutation-types'

// export const lineOption = ref<EChartsOption>({})

type PieDataItem = {
    name: string
    value: number
}

type PieSeriesData = PieDataItem[]

function createPieOption(data: PieSeriesData): EChartsOption {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        label: {
            show: true
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '文章统计概览',
                type: 'pie',
                radius: ['40%', '70%'],
                // roseType: 'area',
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data
            }
        ]
    }
}

/**
 * useOverview
 * */
export default function useOverview() {

    const store = useStore()

    const pieOption: Ref<EChartsOption> = ref({})
    const articleInfo = reactive({
        total: 0,
        ctime: 0
    })

    const commentInfo = reactive({
        comments: 0,
        unread: 0
    })

    function getOverview() {
        getOverviewData().then((res: any) => {
            if (!res.success) {
                warningNotify(res.message)
                return
            }
            const { data: { total, ctime, unread, comments, chartOption } } = res
            articleInfo.total = total
            articleInfo.ctime = ctime
            commentInfo.comments = comments
            commentInfo.unread = unread
            pieOption.value = createPieOption(chartOption)
            store.commit(M_SET_UNREAD, unread)
        }).catch(err => {
            errorNotify(err.message)
        })
    }

    onMounted(() => {
        getOverview()
    })

    return {
        pieOption,
        ...toRefs(articleInfo),
        ...toRefs(commentInfo)
    }
}

// setTimeout(() => {
//     lineOption.value = {
//         tooltip: {
//             trigger: 'axis'
//         },
//         xAxis: {
//             data: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00']
//         },
//         yAxis: {},
//         series: [{
//             type: 'line',
//             smooth: true,
//             data: [5, 10, 26, 53, 12, 8]
//         }]
//     }
// }, 2000)
