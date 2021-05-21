<template>
  <section class="k-article-page">
    <KHeader title="(≖ᴗ≖)✧"/>
    <!--  文章列表页  -->
    <div v-if="Object.keys(articleList).length === 0" class="nothing-content flex-center">
      <Empty>
        <span class="tip txt-overflow">空无一物 (≖ᴗ≖)✧</span>
      </Empty>
      <!--<KWave />-->
    </div>
    <!--  有内容  -->
    <div v-else class="content">

      <!--   月份分组   -->
      <div
        class="year-list"
        v-for="(yearItem, year, idx) in articleList"
        :key="idx"
      >
        <ul
          class="month-list"
          v-for="(monthItem, month) in yearItem"
          :key="month"
        >
          <li class="month">{{ month + ', ' + year }}</li>
          <li class="month-item">
            <div
              class="article-item"
              v-for="articleItem in monthItem"
              :key="articleItem.uid"
              @click="toDetailPage(articleItem)"
            >
              <div class="cover-box flex-center">
                <img
                  v-lazy='articleItem.cover'
                  src='~@/static/images/sunny.webp'
                  :alt='articleItem.title'
                >
              </div>
              <div class="article-content flex-col-around">
                <span class="title txt-overflow">{{ articleItem.title }}</span>
                <span class="tip-txt txt-overflow">
                  {{ articleItem.views + ' READED' }}
                  {{ articleItem.liked ? (' / ' + articleItem.liked + ' LIKED') : '' }}
                </span>
              </div>
              <div class="day-marker">
                {{ articleItem.time.day }}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <LoadMore :load-status="status"/>
    </div>

    <ThemeSwitch/>
  </section>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {mapState} from 'vuex'
import {
  NO_MORE,
  LOADING,
  LOAD_MORE,
  CURRENT_PAGE,
  TOTAL_ITEMS,
  LOAD_STATUS,
  M_SET_LOAD_STATUS,
  M_SET_TOTAL_ITEMS,
  M_SET_CURRENT_PAGE,
  M_RESET_LOAD_MORE
} from '~/store/mutation-types'
import {Context} from '@nuxt/types'
import {ArticleItem} from '~/types'
import {commitMutations, mapYearGroup, createArticleListData, errorNotify} from '~/utils/util'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import Empty from '~/components/Empty.vue'
import LoadMore from '~/components/LoadMore.vue'
import scrollMixin from '~/mixin/scroller'

export default defineComponent({
  name: 'Article',
  mixins: [scrollMixin],
  components: {KHeader, ThemeSwitch, Empty, LoadMore},
  // @ts-ignore => merge to data
  async asyncData({$axios, store}: Context): Promise<object | void> | object | void {
    try {
      const {success, data} = await $axios.get('/record/list', {
        params: {
          pageNo: 1,
          pageSize: 10
        }
      })
      if (success) {
        const {list, total} = data
        commitMutations(store, M_SET_TOTAL_ITEMS, total)
        if (list.length < total) {
          commitMutations(store, M_SET_LOAD_STATUS, LOAD_MORE)
        } else {
          commitMutations(store, M_SET_LOAD_STATUS, NO_MORE)
        }
        return {
          listData: list
        }
      }
      return {
        listData: []
      }
    } catch (e) {
      return {
        listData: []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      curPage: (state: any) => state[CURRENT_PAGE],
      totalItems: (state: any) => state[TOTAL_ITEMS],
      status: (state: any) => state[LOAD_STATUS]
    }),
    /* 更改为 computed 渲染 article list 便于合并请求得到的文章列表 */
    articleList({listData}) {
      return createArticleListData(mapYearGroup(listData))
    }
  },
  methods: {
    toDetailPage(articleItem: ArticleItem) {
      const {uid, id} = articleItem
      this.$router.push(`/article/${uid}_${id}`)
    },
    loadMore() {
      this.getArticleList(this.curPage + 1)
    },
    async getArticleList(nextPage: number) {
      const vm = this
      commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, LOADING)
      const start = Date.now()
      try {
        const {success, data} = await vm.$axios.get('/record/list', {
          params: {
            pageNo: nextPage,
            pageSize: 10
          }
        })
        if (success) {
          const {total, list} = data
          vm.updateLoadStatus(start, list, true, total)
        } else {
          vm.updateLoadStatus(start, [], false)
        }
      } catch (err) {
        // 请求失败，关闭 loading 状态，提示错误信息
        commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, LOAD_MORE)
        errorNotify(err.message)
      }
    },
    updateLoadStatus(
      start: number,
      articleList: ArticleItem[],
      success: Boolean,
      total?: number
    ) {
      const end = Date.now()
      // 总条数有值则更新
      total && commitMutations(this.$store, M_SET_TOTAL_ITEMS, total)
      new Promise(resolve => {
        if (end - start > 500) {
          resolve('')
        } else {
          setTimeout(() => {
            resolve('')
          }, 500)
        }
      }).then(() => {
        // @ts-ignore
        this.listData = [...this.listData, ...articleList]
        // @ts-ignore
        if (this.listData.length < total) {
          // 还有更多文章
          commitMutations(this.$store, M_SET_LOAD_STATUS, LOAD_MORE)
        } else {
          // 没有更多
          commitMutations(this.$store, M_SET_LOAD_STATUS, NO_MORE)
        }
        // 请求成功 => 当前页 +1
        success && commitMutations<number>(this.$store, M_SET_CURRENT_PAGE, this.curPage + 1)
      })
    }
  },
  watch: {
    scrollerIsBottom(isBottom) {
      // @ts-ignore
      if (isBottom && (this.status === LOAD_MORE) && (this.msgList.length < this.totalItems)) {
        this.getArticleList(this.curPage + 1)
      }
    }
  },
  beforeDestroy() {
    commitMutations(this.$store, M_RESET_LOAD_MORE)
  },
  head() {
    return {
      title: 'Article | K.island'
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/pages/article";
</style>
