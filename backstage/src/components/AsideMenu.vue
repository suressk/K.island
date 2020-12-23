<template>
  <aside class="aside-menu scroller" :class="{ shrink: shrinkMenu }">
    <router-link
      v-for="menuItem in menuList"
      :key="menuItem.label"
      :to="menuItem.path"
      class="menu-item flex-center txt-overflow"
    >
      <i class="iconfont" :class="menuItem.icon" />
      <span v-show="!shrinkMenu">{{ menuItem.label }}</span>
    </router-link>
    <i class="iconfont shrink-switch flex-center" :class="iconClass" @click="handleShrinkMenu" />
  </aside>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

const menuList = [
  { label: '心情 / 杂记', path: '/soul', icon: 'icon-edit' },
  { label: '吐槽 / 赞赏', path: '/reply', icon: 'icon-reply' }
]

export default {
  name: 'AsideMenu',
  setup () {
    // 收缩菜单项
    const shrinkMenu = ref<boolean>(false)
    const iconClass: string = computed(() => {
      return shrinkMenu.value ? 'icon-stretch' : 'icon-shrink'
    })

    function handleShrinkMenu () {
      shrinkMenu.value = !shrinkMenu.value
    }
    return {
      menuList,
      shrinkMenu,
      iconClass,
      handleShrinkMenu
    }
  }
}
</script>

<style lang="less">
.aside-menu {
  width: 200px;
  height: calc(100vh - 60px);
  background-color: #323232;
  padding: 20px 0;
  color: #fff;
  transition: all 0.5s;
  position: relative;
  .menu-item {
    padding: 20px 0 20px 20px;
    display: block;
    text-align: center;
    transition: all 0.5s;
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
    width: unset;
    .menu-item {
      padding: 20px 5px;
    }
  }
  &:hover .shrink-switch {
    opacity: 1;
  }
  .shrink-switch {
    position: absolute;
    z-index: 99;
    width: 20px;
    height: 30px;
    top: 0;
    right: -20px;
    background-color: #323232;
    cursor: pointer;
    transition: all 0.5s;
    opacity: 0;
  }
}
</style>
