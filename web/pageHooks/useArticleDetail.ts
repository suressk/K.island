import {
  ref,
  Ref,
  reactive,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  nextTick
} from '@nuxtjs/composition-api'
import { parseMarkdownFile, errorNotify, DEFAULT_ERROR_TIP } from '~/utils'
import { ArticleDetail } from '~/types'

type Ids = [string, string]

// 获取文章 uid 与 id
function getIds(): Ids {
  const paths = window.location.pathname.split('/')
  const idGroup = paths[paths.length - 1] // uid_id
  const ids = idGroup.split('_') as Ids // 拆分 uid 与 id
  return ids
}

interface ArticleDetailReturns {
  article: ArticleDetail
  htmlContent: Ref<string>
  typeClass: Ref<string>

}

/**
 * @description 文章详情页面
 * @author Saul
 * @date 26/09/2021
 */
const useArticleDetail = (): ArticleDetailReturns => {
  const vm = getCurrentInstance()!.proxy
  const axios = vm.$axios
  const article = reactive<ArticleDetail>({
    id: 1,
    uid: '',
    time: {
      year: '',
      month: '',
      monthNum: 0,
      day: '',
      hour: '',
      minute: ''
    },
    title: '',
    introduce: '',
    tag: 'mood',
    views: 10,
    liked: 1,
    cover: '',
    ctime: Date.now(),
    utime: Date.now(),
    content: '',
    music: '',
    musicName: ''
  })
  const htmlContent = ref('')
  const typeClass = ref('mood')

  const fetchArticleDetail = async (uid: string, id: string) => {
    try {
      const { success, data } = await axios.get('/record/detail', {
        params: { uid, id }
      })
      if (success) {
        htmlContent.value = parseMarkdownFile(data.content)
        typeClass.value = data.tag.toLowerCase() === 'mood' ? 'mood' : 'code'

        // return {
        //   article: data,
        //   htmlContent: parseMarkdownFile(data.content),
        //   typeClass: data.tag.toLowerCase() === 'mood' ? 'mood' : 'code'
        // }
      }
    } catch (error: any) {
      errorNotify(error?.message || DEFAULT_ERROR_TIP)
    }
  }
  onMounted(() => {
    const [uid, id] = getIds()
    fetchArticleDetail(uid, id)
  })

  return {
    article,
    htmlContent,
    typeClass
  }

}

export default useArticleDetail