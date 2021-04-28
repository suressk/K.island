<template>
  <section class="comment">
    <h3 class="primary-title flex-between">
      Comment Management

      <span class="link-txt d-flex" :disabled="!canBeRead" @click="handleRead">
        <i class="iconfont icon-update"/>
        <span>标记为已读</span>
      </span>
    </h3>

    <!--    <div class="mb-1 read-txt">-->
    <!--    </div>-->

    <a-table
        :loading="loading"
        :columns="columns"
        :row-key="item => item.id"
        :pagination="pagination"
        :data-source="commentList"
        :row-selection="rowSelection"
        @change="handlePageChange"
    >
      <!--:row-selection="{selectedRowKeys, onChange: onSelectChange}"-->
      <template #id="{ record, index }">
        <a-badge :dot="record.isRead === 0">{{ index + 1 }}</a-badge>
      </template>

      <template #createTime="{ text }">
        <a-tag color="cyan">{{ text }}</a-tag>
      </template>

      <template #action="{ record }">
        <span class="action">
          <i class="iconfont icon-reply" @click.stop="handleOpenReply(record)"/>

          <pop-confirm
            @click.stop
            title="Sure to delete ?"
            @confirm.stop="handleDeleteComments(record)"
          >
            <i class="iconfont icon-delete"/>
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
import {Table, Popconfirm, Tag, Badge, Modal} from 'ant-design-vue'
import useComment from './useComment'

export default defineComponent({
  name: "index",
  components: {
    'a-table': Table,
    'a-tag': Tag,
    'a-badge': Badge,
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
  //.read-txt {
  //  padding: 16px 0;
  //  font-weight: 500;
  //  font-size: 18px;
  //}
  .link-txt {
    padding: 10px;
    font-weight: 500;
    font-size: 16px;
    user-select: none;
    .iconfont {
      font-size: 14px;
      margin: 3px 5px 0 0;
    }
  }
}
</style>
