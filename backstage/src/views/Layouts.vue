<template>
  <section class="layouts-container">
    <loading-progress :loading="false" />
    <header class="header-container flex-between">
      <h1 class="title">K.island</h1>
      <el-dropdown @command="handleLogout" trigger="click">
        <div class="avatar flex-center">K.</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout" class="flex-center">
              <i class="iconfont icon-logout" />
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>
    <main class="main-container d-flex">
      <aside-menu />
      <div class="main">
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
            >鄂公安备 42282302422860</a>
          </span>
        </footer>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import AsideMenu from '@/components/AsideMenu.vue'
import LoadingProgress from '@/components/custom/LoadingProgress.vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { deleteCookie, Notify, removeStorageItem } from '@/utils/util'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'Layouts',
  components: {
    AsideMenu,
    LoadingProgress,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { ctx } = getCurrentInstance()
    function handleLogout () {
      removeStorageItem(ACCESS_TOKEN)
      deleteCookie(ACCESS_TOKEN)
      Notify('success', 'SUCCESS', '退出登录')
      // 1s 后跳转到登录页
      setTimeout(() => {
        ctx.$router.push('/login')
      }, 1000)
    }
    return {
      handleLogout
    }
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
      background-image: url("../assets/svg/logo.svg");
      background-size: 40px 40px;
      background-repeat: no-repeat;
      background-position: 10px 10px;
    }
    .el-dropdown {
      margin-right: 30px;
    }
    .avatar {
      background-color: #e9f1f6;
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 50%;
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
        overflow: hidden;
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
