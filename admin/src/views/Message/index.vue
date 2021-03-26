<template>
  <section class="message-board scroller">
    <h3 class="primary-title mb-1">Message Management</h3>

    <a-table
      :loading="loading"
      :columns="columns"
      :row-key="item => item.id"
      :pagination="pagination"
      :data-source="msgList"
      @change="handlePageChange"
    >
      <template #id="{ index }">
        {{ index + 1 }}
      </template>
      <template #ctime="{ text }">
        <a-tag color="cyan">{{ dayjs(text).format(timeFormat) }}</a-tag>
      </template>

      <template #action="{ record }">
        <pop-confirm
          title="Sure to delete ?"
          @confirm="handleDeleteMsg(record)"
        >
          <i class="iconfont icon-delete" />
        </pop-confirm>
      </template>
    </a-table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Table, Popconfirm, Tag } from 'ant-design-vue'
import useMessage from './useMessage'
import dayjs from 'dayjs'

const timeFormat = 'YYYY-MM-DD HH:mm'

export default defineComponent({
  name: "Message",
  components: {
    'a-table': Table,
    'a-tag': Tag,
    'pop-confirm': Popconfirm
  },
  setup() {
    return {
      dayjs,
      timeFormat,
      ...useMessage()
    }
  }
})
</script>

<style lang="scss">

</style>
