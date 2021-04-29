<template>
  <section class="comment">
    <h3 class="primary-title flex-between">
      <span>
        <i class="iconfont icon-flashing" />
        Comment Management
      </span>

      <span class="link-txt d-flex" :disabled="!canBeRead">
        <i class="iconfont icon-update"/>
        <span @click="handleRead">标记为已读</span>
      </span>
    </h3>

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
          <i class="iconfont icon-reply" @click.stop="openReply(record)"/>

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
      v-model:visible="replyVisible"
      class="reply-modal"
      centered
      @ok="reply"
      @cancel="showReplyModal(false)"
    >
      <div class="modal-avatar">
        <img src="../../assets/images/avatar.png" alt="avatar">

        <span class="mentions-txt info">回复：{{ replyTargetInfo.fromName }}</span>
      </div>

      <div class="reply-content">
        <a-textarea
          placeholder="评论回复..."
          v-model:value="replyContent"
          :autoSize="{ minRows: 8, maxRows: 8 }"
        />
      </div>
    </a-modal>


  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Table, Popconfirm, Tag, Badge, Modal, Input} from 'ant-design-vue'
import useComment from './useComment'

export default defineComponent({
  name: "index",
  components: {
    'a-table': Table,
    'a-tag': Tag,
    'a-badge': Badge,
    'pop-confirm': Popconfirm,
    'a-modal': Modal,
    'a-input': Input,
    'a-textarea': Input.TextArea
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
  .ant-badge {
    padding: 0 10px;
  }
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
.reply-modal {
  .ant-modal-content {
    border-radius: 0 20px 20px;
  }
  .ant-modal-body {
    position: relative;
    .modal-avatar {
      position: absolute;
      left: 0;
      top: -50px;
      img {
        border-radius: 50%;
        width: 100px;
      }
      .mentions-txt {
        position: absolute;
        left: 100px;
        bottom: 10px;
        white-space: nowrap;
      }
    }

    .reply-content {
      margin-top: 50px;
    }
  }
}
</style>
