<template>
  <section class="subscribe">
    <h3 class="primary-title">
      <i class="iconfont icon-flashing" />
      Subscribe
    </h3>

    <!--  manage subscription  -->
    <div class="filter-wrapper d-flex">
      <div class="filter-item d-flex">
        <a-input
          placeholder="Article title"
          v-model:value="email"
          style="width: 250px;"
          allowClear
          @pressEnter="handleQueryList"
        />
      </div>

      <div class="filter-item d-flex">
        <a-button type="primary" :loading="loading" @click="handleQueryList">
          <template #icon>
            <SearchOutlined />
          </template>
          Query
        </a-button>
      </div>

      <div class="filter-item d-flex">
        <a-button :loading="loading" :disabled="deleteDisabled" @click="handleDeleteSubscribes(null)">
          <template #icon>
            <DeleteOutlined />
          </template>
          Delete
        </a-button>
      </div>
    </div>

    <a-table
      class="subscribe-table"
      :loading="loading"
      :columns="columns"
      :pagination="pagination"
      :row-key="item => item.id"
      :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
      :data-source="subscribeList"
      @change="handlePageChange"
    >

      <template #id="{ index }">
        {{ index + 1 }}
      </template>

      <template #createTime="{ text }">
        <a-tag color="cyan">{{ text }}</a-tag>
      </template>

      <template #action="{ record }">
        <pop-confirm
          title="Sure to delete ?"
          @confirm="handleDeleteSubscribes(record)"
        >
          <i class="iconfont icon-delete" />
        </pop-confirm>
      </template>

    </a-table>

  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Input, Button ,Table, Popconfirm, Tag } from 'ant-design-vue'
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import useSubscribe from './useSubscribe'

export default defineComponent({
  name: "Subscribe",
  components: {
    'a-input': Input,
    'a-button': Button,
    'a-table': Table,
    'a-tag': Tag,
    'pop-confirm': Popconfirm,
    SearchOutlined,
    DeleteOutlined
  },
  setup() {

    return {
      ...useSubscribe()
    }
  }
})
</script>

<style lang="scss">

</style>