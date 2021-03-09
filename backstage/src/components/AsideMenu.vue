<template>
  <aside class="aside-menu scroller" :class="{ shrink: !extendMenu }">
    <router-link
      v-for="menuItem in menuList"
      :key="menuItem.label"
      :to="menuItem.path"
      class="menu-item flex-center txt-overflow trans-all-05"
    >
      <i class="iconfont" :class="menuItem.icon" />
      <span v-show="extendMenu">{{ menuItem.label }}</span>
    </router-link>
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
import { ElSwitch } from 'element-plus'

const menuList = [
  { label: '统计 / 概览', path: '/overview', icon: 'icon-overview' },
  { label: '心情 / 杂记', path: '/add', icon: 'icon-add' },
  { label: '杂货 - 整理', path: '/management', icon: 'icon-management' },
  { label: '吐槽 / 赞赏', path: '/reply', icon: 'icon-reply' }
]

export default {
  name: 'AsideMenu',
  components: { ElSwitch },
  setup () {
    // 收缩菜单项
    const extendMenu = ref<boolean>(false)

    return {
      menuList,
      extendMenu
    }
  }
}
</script>

<style lang="scss">
.aside-menu {
  width: 180px;
  height: calc(100vh - 60px);
  background-color: #323232;
  padding: 20px 0;
  color: #fff;
  position: relative;
  flex-shrink: 0;
  transition: width .5s;
  .menu-item {
    padding: 20px 0 20px 20px;
    display: block;
    text-align: center;
    color: inherit;
    border-right: 5px solid transparent;
    font-size: 14px;
    &.router-link-exact-active {
      background-color: #212121;
      color: #14ffec;
      border-right-color: #0d7377;
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
