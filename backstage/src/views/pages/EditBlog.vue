<template>
  <!-- 新增博客文章 -->
  <section class="edit-blog">
    <div class="base-info d-flex">
      <div>
        <el-input type="text" v-model="title" />
      </div>
      <el-button type="primary">Edit</el-button>
    </div>
  </section>
</template>

<script>
import { ElButton, ElInput } from 'element-plus'
import { ref, reactive, toRefs, onMounted } from 'vue'

export default {
  name: 'EditBlog',
  components: {
    ElButton,
    ElInput
  },
  setup () {
    const info = reactive({
      title: ''
    })
    const markArticle = ref('')
    onMounted(() => {
      document.title = '岛屿心情 / 岛屿文章 - K.island'
    })
    return {
      ...toRefs(info),
      markArticle
    }
  }
}
</script>

<style scoped>

</style>
