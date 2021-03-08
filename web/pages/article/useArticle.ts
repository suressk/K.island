import { SetupContext } from '@nuxtjs/composition-api'
import { M_SET_ARTICLE_ITEM } from '~/store/mutation-types'
// A_QUERY_ARTICLE_DETAIL
import { ArticleItem } from '~/@types'

// const colors = ['rgba(0, 222, 255, 0.2)', 'rgba(157, 192, 249, 0.2)', 'rgba(0, 168, 255, 0.2)']

export default function useArticle (context: SetupContext) {
  const { root: { $router, $store } } = context

  function handleToDetail(articleItem: ArticleItem) {
    // $router.push('/article/' + articleItem.uid + '_' + articleItem.id)
    $store.commit(M_SET_ARTICLE_ITEM, articleItem) // 保存当前文章 item
    $router.push({
      path: '/article/' + articleItem.uid + '_' + articleItem.id
    })
  }

  return {
    handleToDetail
  }
}
