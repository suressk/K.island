<template>
  <section class="comment-board">
    <h3 class="primary-title mb-1">Comment Management</h3>



    <a-table
      :loading="loading"
      :columns="columns"
      :row-key="item => item.id"
      :pagination="pagination"
      :data-source="commentList"
      @change="handlePageChange"
    >

      <template #action="{ record }">
        <span class="action">
          <i class="iconfont icon-reply" />

          <pop-confirm
            title="Sure to delete ?"
            @confirm="handleDeleteOneComment(record)"
          >
            <i class="iconfont icon-delete" />
          </pop-confirm>
        </span>
      </template>
    </a-table>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import { Table, Popconfirm, Tag } from 'ant-design-vue'
import useComment from './useComment'

export default defineComponent({
  name: "index",
  components: {
    'a-table': Table,
    'a-tag': Tag,
    'pop-confirm': Popconfirm
  },
  setup() {
    return {
      ...useComment()
    }
  }
})
</script>

<style scoped>

</style>
