<template>
  <section class="layouts-container">
    <header class="header-container">
      <h1 class="title">K.island</h1>
    </header>
    <main class="main-container d-flex">
      <aside-menu />
      <div class="main">
        <div class="main-content scroller-light">
          <router-view></router-view>
        </div>
        <!--  页脚  -->
        <footer class="footer-container flex-between">
          <span class="footer-item txt-overflow">K.island</span>
          <span class="footer-item txt-overflow">嗐 | 好久不见</span>
          <span class="footer-item txt-overflow">
            <a
              class="link"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42282302422860"
              target="_blank"
            >鄂公安备 42282302422860</a>
          </span>
        </footer>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import AsideMenu from '@/components/AsideMenu'

export default {
  name: 'Layouts',
  components: {
    AsideMenu
  }
}
</script>

<style lang="less">
.layouts-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #e2e2e2;
  .header-container {
    height: 60px;
    line-height: 60px;
    color: #14ffec;
    background-color: #212121;
    .title {
      width: 200px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      font-style: italic;
      background-image: url("../assets/svg/logo.svg");
      background-size: 40px 40px;
      background-repeat: no-repeat;
      background-position: 10px 10px;
    }
  }
  .main-container {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: calc(100vh - 60px);
    .main {
      height: calc(100% - 10px);
      min-width: calc(100% - 200px);
      flex-grow: 1;
      overflow: auto;
      background-color: #fff;
      margin: 10px 10px 0;
      .main-content {
        height: calc(100% - 40px);
        overflow: auto;
        padding: 10px;
      }
    }
    .footer-container {
      user-select: none;
      height: 40px;
      line-height: 40px;
      background-color: #e2e2e2;
      overflow: hidden;
      color: #808080;
      font-size: 12px;
      a {
        color: inherit;
        padding: 0 5px;
      }
    }
  }
}
</style>
