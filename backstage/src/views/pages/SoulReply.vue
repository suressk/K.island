<template>
  <!-- 评论回复 -->
  <section class="reply-comments">
    reply
  </section>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'Reply',
  setup () {
    onMounted(() => {
      document.title = '漂流瓶 - K.island'
    })
    return {}
  }
}
</script>

<style lang="scss">
.reply-comments {
  width: 100%;
  height: 100%;
}
</style>
