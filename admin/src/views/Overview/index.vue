<template>
  <div class="overview flex-col-start">
    <h3 class="primary-title">
      <i class="iconfont icon-flashing" />
      Overview
    </h3>

    <div class="card-container flex-between">
      <overview-card title="ARTICLE TAG">
        <v-chart :options="pieOption" />
      </overview-card>

      <!-- <div>
        <h4 class="card-header">ARTICLE TAG</h4>

        <div class="card-content">
          <v-chart :options="pieOption" />
        </div>
      </div>-->

      <overview-card title="ARTICLES">
        <p class="card-center-info">
          <span class="card-center-num">{{ total }}</span>
          <span>篇</span>
        </p>

        <template #tip>
          <p class="card-tip">
            最新文章发布于：
            <span class="info">「{{ formatTime(ctime) }}」</span> 继续加油！
          </p>
        </template>
      </overview-card>

      <!-- <div class="card">
        <h4 class="card-header">ARTICLE</h4>

        <div class="card-content">
          <p class="card-center-info">
            <span class="card-center-num">{{ total }}</span>
            <span>篇</span>
          </p>
          <p class="card-tip">
            最新文章发布于：【
            <span class="info">{{ ctime && formatTime(ctime) }}</span>】 继续加油！
          </p>
        </div>
      </div>-->

      <overview-card title="COMMENTS">
        <p class="card-center-info">
          <span class="card-center-num">{{ comments }}</span>
          <span>条</span>
        </p>

        <template #tip>
          <p class="card-tip">
            未读评论：
            <span class="error">「{{ unread }}」</span>
            来自陌生人的问候！
          </p>
        </template>
      </overview-card>

      <!-- <div class="card">
          <h4 class="card-header"></h4>

          <div class="card-content">
            <p class="card-center-info">
              <span class="card-center-num">{{ comments }}</span>
              <span>条</span>
            </p>
            <p class="card-tip">
              未读评论：【
              <span class="error">{{ unread }}</span>】 来自陌生人的问候！
            </p>
          </div>
      </div>-->

      <overview-card title="MESSAGES">
        <p class="card-center-info">
          <span class="card-center-num">Unrealized</span>
        </p>
      </overview-card>

      <!-- <div class="card">
          <h4 class="card-header">MESSAGES</h4>
          <div class="card-content"></div>
      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueEcharts from '/@comp/VueEcharts/index.vue'
import OverviewCard from '/@comp/OverviewCard/index.vue'
import useOverview from './useOverview'
import { formatTime } from '../../utils'
import 'default-passive-events'

export default defineComponent({
  name: "Overview",
  components: {
    'v-chart': VueEcharts,
    OverviewCard
  },
  setup() {
    return {
      formatTime,
      ...useOverview()
    }
  }
})
</script>

<style lang="scss">
.overview {
  height: 100%;
  width: 100%;

  .card-container {
    height: calc(100% - 70px);
    width: 100%;
    flex-wrap: wrap;
  }

  .card {
    padding: 20px;
    height: 48%;
    width: 48%;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px var(--box-shadow);
    border-radius: 5px;
    overflow: hidden;
    .card-header {
      color: var(--primary);
      font-size: 20px;
      font-weight: 500;
      height: 40px;
      border-bottom: 1px solid var(--border);
    }
    .card-content {
      height: calc(100% - 40px);
      position: relative;
      .card-center-info {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .card-center-num {
          color: var(--primary);
          font-size: 60px;
          margin: 0 10px;
          font-style: italic;
        }
      }
      .card-tip {
        position: absolute;
        right: 0;
        bottom: 0;
        color: var(--tipColor);
      }
    }
  }
}
</style>
