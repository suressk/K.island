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

    </div>

    <ThemeSwitch />
    <KFooter />
  </section>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { M_RESET_LOAD_MORE, M_SET_TOTAL_ITEMS } from '~/store/mutation-types'
import {commitMutations, createArticleListData} from '~/utils/util'
import useArticle from './useArticle'
import KHeader from '~/components/KHeader/index.vue'
import KFooter from '~/components/KFooter.vue'
import KWave from '~/components/KWave.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
// import Notification from '~/components/notification'

export default defineComponent({
  name: 'Article',
  components: { KHeader, KWave, KFooter, ThemeSwitch },
  // @ts-ignore => merge to data
  async asyncData({ $axios, store }: Context): Promise<object | void> | object | void {
    try {
      // @ts-ignore
      const { success, data } = await $axios.get('/record/list', { params: { pageNo: 1, pageSize: 10 } })
      if (success) {
        // const result = createArticleListData(data.list)
        // const { total } = data
        commitMutations(store, M_SET_TOTAL_ITEMS, data.total)
        return {
          listData: createArticleListData(data.list)
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
  setup (props, ctx: SetupContext) {
    return {
      ...useArticle(ctx)
    }
  },
  // @ts-ignore
  beforeRouteLeave(to, from, next) {
    commitMutations(this.$store, M_RESET_LOAD_MORE)
    next()
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
