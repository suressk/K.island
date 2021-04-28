<template>
  <div class="overview flex-col-start">
    <h3 class="primary-title">Overview</h3>

    <div class="chart-container flex-between">
      <div class="chart-item">
        <v-chart :options="pieOption"/>
      </div>
      <div class="chart-item">
        <v-chart :options="lineOption"/>
      </div>
    </div>

    <div class="card-container flex-between">
      <div class="card">
        <h4 class="card-header">ARTICLE</h4>

        <div class="card-content">
          <p class="card-center-info">
            <span class="card-center-num">{{ total }}</span>
            <span>篇</span>
          </p>
          <p class="card-tip">
            最新文章发布于：【<span class="info">{{ DAYJS(ctime).format(DATE_FORMAT) }}</span>】 继续加油！
          </p>
        </div>
      </div>

      <div class="card">
        <h4 class="card-header">COMMENTS</h4>

        <div class="card-content">
          <p class="card-center-info">
            <span class="card-center-num">{{ comments }}</span>
            <span>条</span>
          </p>
          <p class="card-tip">
            未读评论：【<span class="info">{{ unread }}</span>】 来自陌生人的问候！
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import DAYJS from 'dayjs'
import VueEcharts from '/@comp/VueEcharts/index.vue'
import useOverview, {lineOption, pieOption} from './useOverview'
import 'default-passive-events'
const DATE_FORMAT = 'YYYY-MM-DD HH:mm'

export default defineComponent({
  name: "Overview",
  components: {
    'v-chart': VueEcharts
  },
  setup() {
    return {
      DAYJS,
      DATE_FORMAT,
      ...useOverview(),
      lineOption,
      pieOption
    }
  }
})
</script>

<style lang="scss">
.overview {
  height: 100%;
  width: 100%;

  .card-container {
    height: 400px;
    width: 100%;
  }
  .chart-container {
    height: calc(100% - 450px);
    width: 100%;
  }
  .card,
  .chart-item {
    border-radius: 5px;
    height: 90%;
    width: 48%;
    transition: all .3s ease;
    //border: 1px solid var(--primary);
    //border-color: transparent;
    box-shadow: 0 0 10px var(--box-shadow);
    //&:hover {
    //  transform: translateY(-5px);
    //}
  }

  .card {
    padding: 20px;
    height: 100%;
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
        right: 20px;
        bottom: 0;
        color: var(--tipColor);
      }
    }
  }

  .chart-item {

  }
}
</style>
