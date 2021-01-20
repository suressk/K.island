<template>
  <div class="k-article-page">
    <Header />
    <!--  文章列表页  -->
    <section class="content">
      文章列表
    </section>

    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Article',
  head () {
    return {
      title: 'Article | K.island'
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/css/pages/article.scss";
</style>
