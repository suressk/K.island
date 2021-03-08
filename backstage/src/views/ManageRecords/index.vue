<template>
  <section class="management-records">
    <!--  查询筛选条件  -->
    <div class="filter-conditions">
      <el-input size="small" placeholder="按标题模糊查询" style="width: 250px; margin-right: 20px" />
      <el-button type="primary" size="small">查询</el-button>
    </div>
    <!--  文章列表  -->
    <div class="record-list">
      <el-table
        class="records-table"
        :data="records"
        style="width: 100%"
        header-align="center"
      >
        <!--<el-table-column type="selection" width="55" />-->
        <el-table-column
          label="日期"
          align="center"
        >
          <template #default="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ dayjs(scope.row.ctime).format(timeFormat) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          align="center"
        >
          <template #default="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="简介"
          align="center"
        >
          <template #default="scope">
            <span>{{ scope.row.introduce }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          align="center"
        >
          <template #default="scope">
            <el-tag type="primary">{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="封面"
          align="center"
        >
          <template #default="scope">
            <img v-if="scope.row.cover" alt="" class="cover-preview" :src="scope.row.cover">
            <el-tag v-else type="danger">没有封面哦</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Manage"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="success"
              size="mini"
              @click="handleShowDetail(scope.row)"
            >详情</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleShowEdit(scope.row)"
            >编辑</el-button>
            <el-popconfirm
              confirmButtonText='是的'
              cancelButtonText='点错啦'
              icon="el-icon-info"
              iconColor="red"
              :title="'确定删除《'+ scope.row.title +'》吗？'"
              @confirm="handleDeleteRecord(scope.row)"
            >
              <template #reference>
                <el-button type="danger" size="mini">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--   分页   -->
      <el-pagination
        class="records-pagination"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
    <!--  侧边弹出层 查看详情  -->
    <el-drawer
      title="详情"
      v-model="detailVisible"
      size="40%"
    >
      <article-detail-drawer :article-info="articleDetail" />
    </el-drawer>
    <!--  编辑文章内容 === 修改  -->
    <el-dialog
      title="编辑"
      width="80%"
      v-model="editVisible"
    >
      <edit-article
        :article-info="articleDetail"
        v-model="detailReady"
        @upload-article="handleSaveRecord"
      />
    </el-dialog>
  </section>
</template>

<script lang="ts">
import ArticleDetailDrawer from '@/components/custom/ArticleDetailDrawer.vue'
import EditArticle from '@/components/EditRecord/index.vue'
// eslint-disable-next-line import/no-named-default
import { default as useManage } from './manageRecords'
import { ElInput, ElButton, ElTable, ElTableColumn, ElTag, ElPagination, ElPopconfirm, ElDrawer, ElDialog } from 'element-plus'

export default {
  name: 'ManagementRecords',
  components: {
    ElInput,
    ElButton,
    ElTable,
    ElTableColumn,
    ElTag,
    ElPagination,
    ElPopconfirm,
    ElDrawer,
    ElDialog,
    ArticleDetailDrawer,
    EditArticle
  },
  setup () {
    return {
      ...useManage()
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/css/pages/manageRecords.scss";
</style>
