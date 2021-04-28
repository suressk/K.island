import {ref, reactive, toRefs, onMounted} from 'vue'
import {useStore} from 'vuex'
import {getOverviewData} from '../../api/api'
import {errorNotify, warningNotify} from '../../utils/util'
import {EChartsOption} from 'echarts'
import {M_SET_UNREAD} from '../../store/mutation-types'

export const barOption = ref<EChartsOption>({})
export const lineOption = ref<EChartsOption>({})
export const pieOption = ref<EChartsOption>({})

/**
 * useOverview
 * */
export default function useOverview() {

    const store = useStore()

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
            const {data: {total, ctime, unread, comments}} = res
            articleInfo.total = total
            articleInfo.ctime = ctime
            commentInfo.comments = comments
            commentInfo.unread = unread
            store.commit(M_SET_UNREAD, unread)
        }).catch(err => {
            errorNotify(err.message)
        })
    }

    onMounted(() => {
        getOverview()
    })

    return {
        ...toRefs(articleInfo),
        ...toRefs(commentInfo)
    }
}

setTimeout(() => {
    lineOption.value = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00']
        },
        yAxis: {},
        series: [{
            type: 'line',
            smooth: true,
            data: [5, 10, 26, 53, 12, 8]
        }]
    }
}, 2000)

setTimeout(() => {
    pieOption.value = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Technology',
                type: 'pie',
                radius: ['40%', '70%'],
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
                data: [
                    {value: 30, name: 'ES6+'},
                    {value: 10, name: 'HTML'},
                    {value: 10, name: 'CSS'},
                    {value: 20, name: 'vue'},
                    {value: 20, name: 'react'},
                    {value: 10, name: '性能优化'}
                ]
            }
        ]
    }
}, 1000)
