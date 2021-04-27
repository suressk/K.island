<template>
  <section class="comment">
    <h3 class="primary-title mb-1">Comment Management</h3>

    <div class="mb-1 read-txt">
      <span class="link-txt" :disabled="!canBeRead" @click="handleRead">标记为已读</span>
    </div>

    <a-table
      :loading="loading"
      :columns="columns"
      :row-key="item => item.id"
      :pagination="pagination"
      :data-source="commentList"
      :row-selection="{selectedRowKeys, onChange: onSelectChange}"
      :customRow="tableRowClick"
      @change="handlePageChange"
    >
      <template #id="{ index }">
        <span>{{ index + 1 }}</span>
      </template>

      <template #createTime="{ text }">
        <a-tag color="cyan">{{ text }}</a-tag>
      </template>

      <template #isRead="{ text }">
        <a-tag v-if="text === 1" color="green">Have Read</a-tag>
        <a-tag v-else color="orange">Not Read</a-tag>
      </template>

      <template #action="{ record }">
        <span class="action">
          <i class="iconfont icon-reply" @click="handleOpenReply(record)" />

          <pop-confirm
            title="Sure to delete ?"
            @confirm="handleDeleteComments(record)"
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
.comment {
  .read-txt {
    padding: 16px 0;
    font-weight: 500;
    font-size: 18px;
    .link-txt {
      padding: 10px;
    }
  }
}
</style>
