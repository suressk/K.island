<template>
  <!-- 评论回复 -->
  <section class="reply-comments">
    comments
    <el-button @click="handleLogout" type="primary">退出登录</el-button>
  </section>
</template>

<script lang="ts">
import { backLogout } from '@/api/api'
import { ElButton } from 'element-plus'
import { Notify } from '@/utils/util'

export default {
  name: 'Reply',
  components: { ElButton },
  setup () {
    function handleLogout () {
      backLogout({
        username: 'sure',
        password: 'NdMexHd.Sure...'
      }).then(res => {
        console.log(res)
        Notify('warning', 'WARNING', '退出登录')
      })
    }
    return {
      handleLogout
    }
  }
}
</script>

<style lang="scss">
.reply-comments {
  width: 100%;
  height: 100%;
}
</style>
