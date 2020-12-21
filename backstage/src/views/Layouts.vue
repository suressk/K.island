<template>
  <section class="layouts-container">
    <header class="header-container">
      <h1 class="title">K.island</h1>
    </header>
    <aside-menu />
    <main class="main-container">
      <div class="main-content">
        <router-view></router-view>
      </div>
      <footer class="footer-container flex-center">
        <a class="link" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42282302422860" target="_blank">鄂公安备 42282302422860</a>
      </footer>
    </main>
  </section>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'

export default {
  name: 'Layouts',
  components: {
    AsideMenu
  }
}
</script>

<style lang="scss">
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
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        background-image: url("~@/assets/svg/logo.svg");
        background-size: cover;
        left: 10px;
        top: 10px;
      }
    }
  }
  .main-container {
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc(100vw - 200px);
    height: calc(100vh - 60px);
    .main-content {
      height: calc(100% - 80px);
      margin: 20px;
      overflow: auto;
      background-color: #fff;
      border-bottom: 1px solid #d9d9d9;
    }
    .footer-container {
      height: 40px;
      line-height: 40px;
      background-color: #0d7377;
      a.link {
        font-size: 12px;
        color: #dcdfe6;
        margin: 0 20px;
      }
    }
  }
}
</style>
