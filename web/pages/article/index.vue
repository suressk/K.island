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
import Notification from '~/components/notification'
import useArticle from './useArticle'
import KHeader from '~/components/KHeader/index.vue'
import KFooter from '~/components/KFooter.vue'
import KWave from '~/components/KWave.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import { M_SET_TOTAL_ITEMS } from '~/store/mutation-types'

export default defineComponent({
  name: 'Article',
  components: { KHeader, KWave, KFooter, ThemeSwitch },
  // @ts-ignore => merge to data
  async asyncData({ $axios, store }: Context): Promise<object | void> | object | void {
    try {
      // @ts-ignore
      const { success, data, message } = await $axios.get('/records/list', { params: { pageNo: 1, pageSize: 10 } })
      if (success) {
        const result = createArticleListData(data.list)
        store.commit(M_SET_TOTAL_ITEMS, data.total)
        return {
          listData: result
        }
      }
      Notification({
        title: 'WARNING',
        type: 'warning',
        message: message
      })
      return {
        listData: {}
      }
    } catch (e) {
      // failLoadNotify('the article list')
      return {
        listData: {
          2021: {
            Feb: [
              {
                id: 21,
                uid: 'jVQFzALzn20IIK-0CKFa5vm-7niBxHv-Hgh9QEQ-fSSP8KWS',
                title: 'Test title',
                introduce: 'Introduce',
                views: 90,
                tag: 'JS',
                time: {
                  year: '2021',
                  month: 'Feb',
                  monthNum: 1,
                  day: '21rd'
                },
                cover: '',
                ctime: 123058589416,
                utime: 123058589416
              }
            ]
          }
        }
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
