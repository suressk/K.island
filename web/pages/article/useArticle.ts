import {SetupContext} from '@nuxtjs/composition-api'
import {ArticleItem} from '~/types'

// const colors = ['rgba(0, 222, 255, 0.2)', 'rgba(157, 192, 249, 0.2)', 'rgba(0, 168, 255, 0.2)']

export default function useArticle(context: SetupContext) {
  const {root: {$router}} = context

  function handleToDetail(articleItem: ArticleItem) {
    $router.push({
      path: '/article/' + articleItem.uid + '_' + articleItem.id
    })
  }

  return {
    handleToDetail
  }
}
