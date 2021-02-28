import { SetupContext } from '@nuxtjs/composition-api'
import { A_QUERY_ARTICLE_DETAIL } from '~/store/mutation-types'
import { ArticleListItem } from '~/@types'

// const colors = ['rgba(0, 222, 255, 0.2)', 'rgba(157, 192, 249, 0.2)', 'rgba(0, 168, 255, 0.2)']

export default function useArticle (context: SetupContext) {
  const { root: { $router, $store } } = context

  function handleToDetail(articleItem: ArticleListItem) {
    $router.push('/article/' + articleItem.uid)
    $store.dispatch(A_QUERY_ARTICLE_DETAIL, articleItem)
  }

  return {
    handleToDetail
  }
}
