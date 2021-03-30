<template>
  <section class="comment-board">
    <h3 class="primary-title mb-1">Comment Management</h3>

    <div class="mb-1" style="text-align: end;">
      <button
        class="btn btn-danger"
        :disabled="!canDelete"
        @click="handleDeleteMultipleComments"
      >
        Multiple Delete
      </button>
    </div>

    <a-table
      :loading="loading"
      :columns="columns"
      :row-key="item => item.id"
      :pagination="pagination"
      :data-source="commentList"
      :row-selection="rowSelection"
      @change="handlePageChange"
    >

      <template #action="{ record }">
        <span class="action">
          <i class="iconfont icon-reply" @click="handleOpenReply(record)" />

          <pop-confirm
            title="Sure to delete ?"
            @confirm="handleDeleteOneComment(record)"
          >
            <i class="iconfont icon-delete" />
          </pop-confirm>
        </span>
      </template>
    </a-table>

    <a-modal
      title="Reply"
      v-model:visible="replyVisible"
      centered
    >

    </a-modal>


  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import { Table, Popconfirm, Tag, Modal } from 'ant-design-vue'
import useComment from './useComment'

export default defineComponent({
  name: "index",
  components: {
    'a-table': Table,
    'a-tag': Tag,
    'pop-confirm': Popconfirm,
    'a-modal': Modal
  },
  setup() {
    return {
      ...useComment()
    }
  }
})
</script>

<style lang="scss">

</style>
