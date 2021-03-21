<template>
  <aside class="aside-menu scroller" :class="{ shrink: !extendMenu }">
    <div class="avatar flex-center">
      <img src="../assets/images/avatar.png" alt="avatar">
    </div>
    <router-link
      v-for="menuItem in menuList"
      :key="menuItem.label"
      :to="menuItem.path"
      class="menu-item d-flex txt-overflow"
    >
      <i class="iconfont" :class="menuItem.icon" />
      <span v-show="extendMenu">{{ menuItem.label }}</span>
    </router-link>
    <span class="menu-item d-flex txt-overflow" @click="handleLogout">
      <i class="iconfont icon-logout" />
      <span v-show="extendMenu">Exit</span>
    </span>
    <ElSwitch
      class="extend-switch"
      v-model="extendMenu"
      active-color="#14ffec"
      inactive-color="#212121"
    />
  </aside>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElSwitch } from 'element-plus'
import { Notify, Confirm, deleteCookie, removeStorageItem } from '@/utils/util'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const menuList = [
  { label: 'Overview', path: '/overview', icon: 'icon-overview' },
  { label: 'New Record', path: '/add', icon: 'icon-add' },
  { label: 'Manage Records', path: '/management', icon: 'icon-management' },
  { label: 'Reply', path: '/reply', icon: 'icon-reply' }
]

export default {
  name: 'AsideMenu',
  components: { ElSwitch },
  setup () {
    const router = useRouter()
    // 收缩菜单项
    const extendMenu = ref<boolean>(false)

    function handleLogout () {
      Confirm('warning', '', '确定退出?').then(() => {
        removeStorageItem(ACCESS_TOKEN)
        deleteCookie(ACCESS_TOKEN)
        Notify('success', 'SUCCESS', '退出登录')
        // 1s 后跳转到登录页
        setTimeout(() => {
          router.push('/login')
        }, 1000)
      }).catch(() => undefined)
    }

    return {
      menuList,
      extendMenu,
      handleLogout
    }
  }
}
</script>

<style lang="scss">
.aside-menu {
  width: 180px;
  height: 100vh;
  background-color: var(--primary);
  padding: 20px 0;
  color: #fff;
  position: relative;
  flex-shrink: 0;
  transition: width .5s;
  overflow: hidden;
  .avatar {
    width: 60%;
    border-radius: 50%;
    margin: 20px auto;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .menu-item {
    padding: 20px 0 20px 30px;
    display: block;
    color: inherit;
    border-right: 5px solid transparent;
    font-size: 14px;
    transition: all .5s;
    cursor: pointer;
    &.router-link-exact-active,
    &:hover {
      background-color: #fff;
      color: var(--dark-primary);
      border-right-color: var(--success);
    }
    .iconfont {
      padding: 5px;
      font-size: 13px;
    }
  }
  &.shrink {
    width: 40px;
    .menu-item {
      padding: 20px 5px;
    }
  }
  .extend-switch {
    position: absolute;
    //z-index: 99;
    width: 20px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}
</style>
