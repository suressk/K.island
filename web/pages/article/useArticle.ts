import { onMounted, SetupContext } from '@nuxtjs/composition-api'
// import { waveRecord } from '~/utils/wave'

// const colors = ['rgba(0, 222, 255, 0.2)', 'rgba(157, 192, 249, 0.2)', 'rgba(0, 168, 255, 0.2)']

const data = {
  2020: {
    Jan: [
      {
        id: 1,
        uid: 'nkhasf-ashhf39-23nkbb-sfn',
        time: {
          year: '2020',
          month: 'Jan',
          day: '29th'
        },
        title: '我喜欢你，你也喜欢我吗？',
        introduce: 'introduce 我喜欢你，你也喜欢我吗？',
        views: 125,
        likes: 235,
        tag: 'Mood'
      },
      {
        id: 2,
        uid: 'nkhasf-ahf39-23nkbb-sfn',
        time: {
          year: '2020',
          month: 'Jan',
          day: '30th'
        },
        title: "Don't believe anyone who said love you forever",
        introduce: "introduce Don't believe ever",
        views: 125,
        likes: 235,
        tag: 'Mood'
      }
    ],
    Feb: [
      {
        id: 5,
        uid: 'nkhasf-23nkbb-sfn',
        time: {
          year: '2020',
          month: 'Feb',
          day: '29th'
        },
        title: '我喜欢你吗？',
        introduce: 'introduce 我喜欢你，你也喜欢我吗？',
        views: 125,
        likes: 235,
        tag: 'Mood'
      }
    ]
  },
  2021: {
    Feb: [
    {
      id: 3,
      uid: 'nkhasf-ashhf39-23nkbb',
      time: {
        year: '2021',
        month: 'Feb',
        day: '14th'
      },
      title: '我喜欢你？',
      introduce: 'introduce 我喜欢你？',
      views: 125,
      likes: 235,
      tag: 'Mood'
    }
  ]
  }
}

export default function useArticle (context: SetupContext) {
  // 页面挂载完毕 => 绘制
  onMounted(() => {
    console.log('context: ', context)
  })
  function handleToDetail (uid: string, id: number | string) {
    console.log(uid, id)
  }
  return {
    data,
    handleToDetail
  }
}
