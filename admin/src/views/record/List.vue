<template>
  <div class="record-list">
    <h3 class="primary-title">文章列表</h3>

    <a-table
      class="record-table"
      :loading="loading"
      :columns="columns"
      :row-key="item => item.id"
      :pagination="pagination"
      :data-source="articleList"
      @change="handlePageChange"
    >
      <template #id="{ index }">
        {{ index + 1 }}
      </template>
      <template #cover="{ text }">
        <img :src="text" alt="cover-image">
      </template>
      <template #show="{ text, record }">
        <a-switch
          checked-children="show"
          un-checked-children="hide"
          v-model:checked="switchShow[record.show]"
        />
      </template>
      <template #action="{ record }">
        <span class="action">
          <i class="iconfont icon-edit" @click="toEditRecord(record)" />
          <pop-confirm
            title="Sure to delete ?"
            @confirm="handleDeleteRecord(record)"
          >
            <i class="iconfont icon-delete" />
          </pop-confirm>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Table, Switch, Popconfirm } from 'ant-design-vue'
import useRecordList from './useRecordList'

export default defineComponent({
  name: "RecordList",
  components: {
    'a-table': Table,
    'a-switch': Switch,
    'pop-confirm': Popconfirm
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
  .record-table {
    img {
      max-height: 50px;
    }
  }
  .ant-table {
    tr {
      text-align: center;
    }
    .ant-table-thead th {
      text-align: center;
      border-bottom: 2px solid var(--primary);
    }
    .action .iconfont {
      margin: 0 5px;
      padding: 5px;
      color: var(--tipColor);
      &:hover {
        &:first-child {
          color: var(--primary);
        }
        &:last-child {
          color: var(--error);
        }
      }
    }
  }
}
</style>
