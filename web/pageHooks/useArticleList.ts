import {
  getCurrentInstance,
  ref,
  Ref,
  computed,
  ComputedRef,
  watch,
  onMounted,
  onBeforeUnmount
} from "@nuxtjs/composition-api"
import {
  LOAD_STATUS,
  LOADING,
  HAS_MORE,
  NO_MORE,
  CURRENT_PAGE,
  TOTAL_ITEMS,
  M_RESET_LOAD_MORE,
  M_SET_LOAD_STATUS,
  M_SET_TOTAL_ITEMS,
  M_SET_CURRENT_PAGE
} from "~/store/mutation-types"
import {
  commitMutations,
  createArticleListData,
  mapYearGroup,
  PAGE_SIZE,
  useState
} from "~/utils"
import { ArticleItem } from "~/types"

interface ArticleListReturns {
  isEmpty: Ref<boolean>
  listData: Ref<ArticleItem[]>
  articleList: ComputedRef<any> // 懒得写...
  getArticleList: (nextPage: number) => Promise<void>
  toDetailPage: (item: ArticleItem) => void
  loadMore: () => void
}

/**
 * @description 
 * @author Saul
 * @date 27/09/2021
 * @return {*} 
 */
const useArticleList = (): ArticleListReturns => {
  const vm = getCurrentInstance()!.proxy
  const listData = ref<ArticleItem[]>([])
  const isEmpty = computed(() => listData.value.length === 0)
  const curPage = useState(vm.$store, CURRENT_PAGE)
  // const totalItems = useState(vm.$store, TOTAL_ITEMS)
  const loadStatus = useState(vm.$store, LOAD_STATUS)

  const articleList = computed(() => createArticleListData(mapYearGroup(listData.value)))

  const getArticleList = async (nextPage: number = 1) => {
    commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, LOADING)
    // const start = Date.now()
    try {
      const { success, data } = await vm.$axios.get('/record/list', {
        params: {
          pageNo: nextPage,
          pageSize: PAGE_SIZE
        }
      })
      if (success) {
        const { list, total } = data
        // 总条数
        total && commitMutations<number>(vm.$store, M_SET_TOTAL_ITEMS, total)
        listData.value = [...listData.value, ...list]

        // 还有更多
        if (listData.value.length < total) {
          commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, HAS_MORE)
        } else {
          // 没有更多
          commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, NO_MORE)
        }
        // 当前页 + 1
        commitMutations<number>(vm.$store, M_SET_CURRENT_PAGE, curPage.value + 1)
      }
    } catch (error) {
      commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, HAS_MORE)
    }
  }

  const toDetailPage = ({ uid, id }: ArticleItem) => {
    vm.$router.push(`/article/${uid}_${id}`)
  }

  const loadMore = () => {
    if (loadStatus.value === HAS_MORE) {
      getArticleList(curPage.value)
    }
  }

  // 滚动到页面底部触发加载更多
  // @ts-ignore
  watch(() => vm.scrollerIsBottom, (isBottom: boolean) => {
    if (!isBottom) return
    loadMore()
  })

  onMounted(() => {
    getArticleList()
  })

  onBeforeUnmount(() => {
    commitMutations(vm.$store, M_RESET_LOAD_MORE)
  })

  return {
    isEmpty,
    listData,
    articleList,
    getArticleList,
    toDetailPage,
    loadMore
  }
}

export default useArticleList