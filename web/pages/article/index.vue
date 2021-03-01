<template>
  <section class="k-article-page">
    <KHeader custom-title="(≖ᴗ≖)✧" />
    <!--  文章列表页  -->
    <div v-if="Object.keys(listData).length === 0" class="nothing-content flex-center">
      <span class="tip">空无一物 (≖ᴗ≖)✧</span>
      <!--<canvas ref="waveCanvas" width="100%" height="100%" class="animation-canvas" />-->
      <KWave />
    </div>
    <!--  有内容  -->
    <div v-else class="content">
      <!--   月份分组   -->
      <div
        class="year-list"
        v-for="(yearsVal, year, idx) in listData"
        :key="idx"
      >
        <ul
          class="month-list"
          v-for="(monthsVal, month) in yearsVal"
          :key="month"
        >
          <li class="month">{{ month + ', ' + year }}</li>
          <li class="month-item">
            <div
              class="article-item"
              v-for="articleItem in monthsVal"
              :key="articleItem.uid"
              @click="handleToDetail(articleItem)"
            >
              <div class="img-box"></div>
              <div class="article-content flex-col-around">
                <span class="title txt-overflow">{{ articleItem.title }}</span>
                <span class="tip-txt txt-overflow">
                  {{ articleItem.views + ' READED' }}
                  {{ articleItem.likes ? (' / ' + articleItem.likes + ' LIKED') : '' }}
                </span>
              </div>
              <div class="day-marker">
                {{ articleItem.time.day }}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <ThemeSwitch />
    </div>

    <KFooter />
  </section>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { createArticleListData } from '~/utils/util'
import Notification from "~/components/notification";
// import { A_QUERY_ARTICLE_DETAIL } from '~/store/mutation-types'
import useArticle from './useArticle'
import KHeader from '~/components/KHeader/index.vue'
import KFooter from '~/components/KFooter.vue'
import KWave from '~/components/KWave/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'

export default defineComponent({
  name: 'Article',
  components: { KHeader, KWave, KFooter, ThemeSwitch },
  // store => state
  // fetch({ store }: Context): Promise<void> | void {
  //   store.dispatch(A_QUERY_ARTICLE_DETAIL)
  // },
  // @ts-ignore => merge to data
  async asyncData(ctx: Context): Promise<object | void> | object | void {
    try {
      // @ts-ignore
      const res = await ctx.$axios.get('/records/list', { params: { pageNo: 1, pageSize: 10 } })
      if (res.success) {
        const result = createArticleListData(res.data)
        return {
          listData: result
        }
      }
      Notification({
        title: 'WARNING',
        type: 'warning',
        message: res.message
      })
      return {
        listData: {}
      }
    } catch (e) {
      Notification({
        title: 'ERROR',
        type: 'error',
        message: 'Fail to get the article list'
      })
      return {
        listData: {}
      }
    }
  },
  setup (props, ctx: SetupContext) {
    return {
      ...useArticle(ctx)
    }
  },
  head () {
    return {
      title: 'Article | K.island'
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/pages/article.scss";
</style>
