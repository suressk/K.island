import {
  ref,
  Ref,
  reactive,
  getCurrentInstance,
  onMounted
} from '@nuxtjs/composition-api'
import { parseMarkdownFile, errorNotify, DEFAULT_ERROR_TIP, warnNotify } from '~/utils'
import { ArticleDetail } from '~/types'

type Ids = [string, string]

// 获取文章 uid 与 id
export function getIds(pathname: string): Ids {
  if (!pathname || pathname.indexOf('_') === -1) {
    return ['', '']
  }
  const paths = pathname.split('/')
  const idGroup = paths[paths.length - 1] // uid_id
  // 拆分 uid 与 id
  return idGroup.split('_') as Ids
}

export interface ArticleDetailReturns {
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
    tag: 'Mood',
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
      const { success, data, message } = await vm.$axios.get('/record/detail', {
        params: { uid, id }
      })
      if (success) {
        htmlContent.value = parseMarkdownFile(data.content)
        typeClass.value = data.tag.toLowerCase() === 'mood' ? 'mood' : 'code'

        const NOW = Date.now()
        article.id = data?.id ?? id
        article.uid = data?.uid ?? uid
        article.time = data?.time ?? {}
        article.title = data?.title ?? ''
        article.introduce = data?.introduce ?? ''
        article.tag = data?.tag ?? 'Mood'
        article.views = data?.views ?? 10
        article.liked = data?.liked ?? 1
        article.cover = data?.cover ?? ''
        article.ctime = data?.ctime ?? NOW
        article.utime = data?.utime ?? NOW
        article.content = data?.content ?? ''
        article.music = data?.music ?? ''
        article.musicName = data?.musicName ?? ''
      } else {
        warnNotify(message ?? DEFAULT_ERROR_TIP)
      }
    } catch (error: any) {
      errorNotify(error?.message ?? DEFAULT_ERROR_TIP)
    }
  }
  onMounted(() => {
    const [uid, id] = getIds(window.location.pathname)
    fetchArticleDetail(uid, id)
    console.log('article-detail: ', vm)
  })

  return {
    article,
    htmlContent,
    typeClass
  }

}

export default useArticleDetail