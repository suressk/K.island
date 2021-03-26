<template>
  <section class="record-list scroller">
    <h3 class="primary-title">Record List</h3>

    <div class="filter-wrapper d-flex">
      <div class="filter-item d-flex">
        <a-input
          placeholder="Article title"
          v-model:value="articleTitle"
          style="width: 250px;"
          allowClear
          @pressEnter="handleQueryRecords"
        />
      </div>
      <div class="filter-item d-flex">
        <a-button type="primary" :loading="loading" @click="handleQueryRecords">
          <template #icon>
            <SearchOutlined />
          </template>
          Query
        </a-button>
      </div>
    </div>

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
      <template #tag="{ text }">
        <a-tag color="blue">{{ text }}</a-tag>
      </template>
      <template #cover="{ text }">
        <img v-if="text" :src="text" alt="cover-image">
        <a-tag v-else color="red">No Cover</a-tag>
      </template>
      <template #ctime="{ text }">
        <a-tag color="cyan">{{ dayjs(text).format(timeFormat) }}</a-tag>
      </template>
      <template #utime="{ text }">
        <a-tag color="green">{{ dayjs(text).format(timeFormat) }}</a-tag>
      </template>

      <template #is_delete="{ text, record }">
        <a-switch
          checked-children="show"
          un-checked-children="hide"
          v-model:checked="editableData[record.id].show"
          @change="switchChange(record, $event)"
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
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Input, Button ,Table, Switch, Popconfirm, Tag } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import useList from './useList'
import dayjs from 'dayjs'

const timeFormat = 'YYYY-MM-DD HH:mm'

export default defineComponent({
  name: "RecordList",
  components: {
    'a-input': Input,
    'a-button': Button,
    'a-table': Table,
    'a-switch': Switch,
    'a-tag': Tag,
    'pop-confirm': Popconfirm,
    SearchOutlined
  },
  setup() {
    return {
      dayjs,
      timeFormat,
      ...useList()
    }
  }
})
</script>

<style lang="scss">
.record-list {
  overflow: auto;
  height: 100%;
  .filter-wrapper {
    margin: 20px 0;
    .filter-item:not(:last-child) {
      margin-right: 30px;
    }
  }
  .record-table {
    img {
      max-height: 50px;
    }
  }
}
</style>
