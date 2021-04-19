<template>
  <section class="k-article-page">
    <KHeader title="(≖ᴗ≖)✧"/>
    <!--  文章列表页  -->
    <div v-if="Object.keys(listData).length === 0" class="nothing-content flex-center">
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
        v-for="(yearItem, year, idx) in listData"
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
              <div class="img-box"></div>
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

    </div>

    <ThemeSwitch/>
    <LoadMore :load-status="status"/>
  </section>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {mapState} from 'vuex'
import {
  NO_MORE,
  LOAD_MORE,
  M_RESET_LOAD_MORE,
  M_SET_LOAD_STATUS,
  M_SET_TOTAL_ITEMS,
  LOADING,
  CURRENT_PAGE,
  TOTAL_ITEMS,
  LOAD_STATUS
} from '~/store/mutation-types'
import {Context} from '@nuxt/types'
import {ArticleItem} from '~/types'
import {commitMutations, createArticleListData} from '~/utils/util'
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
      // @ts-ignore
      const {success, data} = await $axios.get('/record/list', {
        params: {
          pageNo: 1,
          pageSize: 1,
          group: 'MONTH'
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
          listData: createArticleListData(list)
        }
      }
      return {
        listData: {}
      }
    } catch (e) {
      return {
        listData: {}
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      curPage: (state: any) => state[CURRENT_PAGE],
      totalItems: (state: any) => state[TOTAL_ITEMS],
      status: (state: any) => state[LOAD_STATUS]
    })
  },
  methods: {
    toDetailPage(articleItem: ArticleItem) {
      const { uid, id} = articleItem
      this.$router.push(`/article/${uid}_${id}`)
    },
    loadMore() {
      this.getArticleList(this.curPage + 1)
    },
    async getArticleList(nextPage: number) {
      commitMutations(this.$store, M_SET_LOAD_STATUS, LOADING)
      const vm = this
      const start = Date.now()
      try {
        commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, LOADING)
        // @ts-ignore
        const {success, data} = await vm.$axios.get('/record/list', {
          params: {
            pageNo: nextPage,
            pageSize: 10,
            group: 'MONTH'
          }
        })

        const end = Date.now()
        if (success) {
          console.log('article list: ', data)
          vm.updateStatus(start, end)
        }
      } catch (err) {

      }
    },
    updateStatus(start: number, end: number) {
      console.log(start, end)
    }
  },
  mounted() {
    // @ts-ignore
    console.log('文章列表: ', this.listData)
    this.getArticleList(2)
  },
  watch: {
    scrollerIsBottom(flag) {
      // @ts-ignore
      if (flag && (this.status === LOAD_MORE) && (this.msgList.length < this.totalItems)) {
        // this.getMessageList()
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
