<template>
  <section class="layouts-container d-flex">

    <aside-menu />

    <main class="main-container">
      <div class="main-content scroller-light">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <transition name="trans">
              <component :is="Component" />
            </transition>
          </keep-alive>
        </router-view>
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
          >
            鄂公安备 42282302422860
          </a>
        </span>
      </footer>
    </main>
  </section>
</template>

<script lang="ts">
import AsideMenu from '@/components/AsideMenu.vue'
import LoadingProgress from '@/components/custom/LoadingProgress.vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

export default {
  name: 'Layouts',
  components: {
    AsideMenu,
    LoadingProgress,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
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
  .main-container {
    height: 100%;
    flex: 1;
    .main-content {
      height: calc(100% - 40px);
      padding: 10px;
      background-color: #fff;
      margin: 10px 10px 0;
      border-radius: 5px;
      overflow: auto;
    }
    .footer-container {
      user-select: none;
      height: 40px;
      line-height: 40px;
      background-color: #e2e2e2;
      overflow: hidden;
      color: #808080;
      font-size: 12px;
      margin: 0 10px;
      a {
        color: inherit;
        padding: 0 5px;
      }
    }
  }
}
</style>
