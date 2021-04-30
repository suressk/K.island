<template>
  <section class="message-board scroller">
    <h3 class="primary-title mb-1">
      <i class="iconfont icon-flashing" />
      Message Management
    </h3>

    <div class="mb-1" style="text-align: right;">
      <a-button
        :disabled="!canDelete"
        @click="handleDeleteMsg(null)"
      >
        Multiple Delete
      </a-button>
    </div>

    <a-table
      :loading="loading"
      :columns="columns"
      :row-key="item => item.id"
      :pagination="pagination"
      :data-source="msgList"
      :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
      @change="handlePageChange"
    >
      <template #id="{ index }">
        {{ index + 1 }}
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
import { Table, Popconfirm, Tag, Button } from 'ant-design-vue'
import useMessage from './useMessage'

export default defineComponent({
  name: "Message",
  components: {
    'a-table': Table,
    'a-tag': Tag,
    'a-button': Button,
    'pop-confirm': Popconfirm
  },
  setup() {
    return {
      ...useMessage()
    }
  }
})
</script>

<style lang="scss">

</style>
