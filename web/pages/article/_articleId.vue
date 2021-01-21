<template>
  <div class="k-article-info">
    <Header />

    <section class="content">
      <h1 class="title">
        文章内容 Title
      </h1>

      <div class="stuffix d-flex">
        <span class="time tip">January 21 2021</span>
        <span class="r-border tip views d-flex">
          <i class="iconfont icon-view" />
          1314
        </span>
        <span class="g-border tip tag d-flex">
          <i class="iconfont icon-tag" />
          Mood
        </span>
        <span class="comments tip d-flex">
          <i class="iconfont icon-comment" />
          25
        </span>
      </div>

      <div class="info">
        在以前的Android Studio版本中，我们介绍过一个Database Inspector，它主要用来帮助开发者理解和调试数据库，Database Inspector是基于一个APP Inspector 系统开发的，它支持很多不同的Inspector类型，比如下面介绍的WorkManager Inspector。

        作者：依然范特稀西
        链接：https://juejin.cn/post/6919852371275317256
        来源：掘金
        著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
export default {
  name: 'ArticleId'
}
</script>

<style scoped lang="scss">
.k-article-info {
  .content {
    width: 800px;
  }
  .stuffix {
    padding: 10px 0;
    >span {
      margin-right: 10px;
    }
  }
}
</style>
