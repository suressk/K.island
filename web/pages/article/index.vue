<template>
  <section class="k-article-page">
    <KHeader title="(≖ᴗ≖)✧" />
    <!--  文章列表页  -->
    <div v-if="isEmpty" class="nothing-content flex-center">
      <span class="tip txt-overflow">空无一物 (≖ᴗ≖)✧</span>
      <LoadMore :load-status="1" />
      <!--<KWave />-->
    </div>
    <!--  有内容  -->
    <div v-else class="content">
      <!--   月份分组   -->
      <div class="year-list" v-for="(yearItem, year, idx) in articleList" :key="idx">
        <ul class="month-list" v-for="(monthItem, month) in yearItem" :key="month">
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
                  v-lazy="articleItem.cover"
                  src="~@/static/images/sunny.webp"
                  :alt="articleItem.title"
                />
              </div>
              <div class="article-content flex-col-around">
                <span class="title txt-overflow">{{ articleItem.title }}</span>
                <span class="tip-txt txt-overflow">
                  {{ articleItem.views + ' READED' }}
                  {{ articleItem.liked ? (' / ' + articleItem.liked + ' LIKED') : '' }}
                </span>
              </div>
              <div class="day-marker">{{ articleItem.time.day }}</div>
            </div>
          </li>
        </ul>
      </div>

      <LoadMore />
    </div>

    <ThemeSwitch />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapState } from 'vuex'
import { ArticleItem } from '~/types'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import LoadMore from '~/components/LoadMore.vue'
import scrollMixin from '~/mixin/scroller'
import useArticleList from '~/pageHooks/useArticleList'
import { commitMutations, mapYearGroup, createArticleListData, errorNotify, delayCall, DEFAULT_ERROR_TIP } from '~/utils'
import {
  NO_MORE,
  LOADING,
  HAS_MORE,
  TOTAL_ITEMS,
  CURRENT_PAGE,
  M_SET_LOAD_STATUS,
  M_SET_TOTAL_ITEMS,
  M_SET_CURRENT_PAGE,
  M_RESET_LOAD_MORE
} from '~/store/mutation-types'
// import {Context} from '@nuxt/types'

export default defineComponent({
  name: 'Article',
  mixins: [scrollMixin],
  components: { KHeader, ThemeSwitch, LoadMore },
  setup() {
    return {
      ...useArticleList()
    }
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
