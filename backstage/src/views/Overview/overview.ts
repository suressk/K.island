import { ref } from 'vue'
import { EChartsOption } from 'echarts'

export const barOption = ref<EChartsOption>({})
export const lineOption = ref<EChartsOption>({})
export const pieOption = ref<EChartsOption>({})

setTimeout(() => {
  barOption.value = {
    title: {
      text: '偏好统计'
    },
    tooltip: {},
    xAxis: {
      data: ['ES 2015+', 'vue', 'react', '心情随笔', '恋爱酸臭味儿', '花样动效']
    },
    yAxis: {},
    series: [{
      name: '浏览量',
      type: 'bar',
      data: [54, 205, 306, 12, 257, 103]
    }]
  }
}, 1000)

setTimeout(() => {
  lineOption.value = {
    title: {
      text: 'Line Chart'
    },
    tooltip: {},
    toolbox: {
      feature: {
        dataView: {},
        saveAsImage: {
          pixelRatio: 2
        },
        restore: {}
      }
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
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '技术支持',
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
          { value: 30, name: 'ES6+' },
          { value: 10, name: 'HTML' },
          { value: 10, name: 'CSS' },
          { value: 20, name: 'vue' },
          { value: 20, name: 'react' },
          { value: 10, name: '性能优化' }
        ]
      }
    ]
  }
}, 3000)
