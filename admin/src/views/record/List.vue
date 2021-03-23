<template>
  <div class="record-list">
    <h3 class="primary-title">文章列表</h3>

    <a-table
      :loading="loading"
      :columns="columns"
      :row-key="item => item.id"
      :pagination="pagination"
      :data-source="articleList"
      @change="handlePageChange"
    >
      <template slot="id" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="cover" slot-scope="text, record, index">
        <img :src="text" alt="cover-image">
      </template>
      <template slot="show" slot-scope="text, record, index">
        <a-switch v-model:checked="text" />
      </template>
      <template slot="action" slot-scope="text, record, index">
        <i class="iconfont icon-overview"></i>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Table, Switch } from 'ant-design-vue'
import useRecordList from './useRecordList'

export default defineComponent({
  name: "RecordList",
  components: {
    'a-table': Table,
    'a-switch': Switch
  },
  setup() {
    return {
      ...useRecordList()
    }
  }
})
</script>

<style lang="scss">
.record-list {
  .ant-table {
    tr {
      text-align: center;
    }
    .ant-table-thead th {
      text-align: center;
      border-bottom: 2px solid var(--primary);
    }
  }
}
</style>
