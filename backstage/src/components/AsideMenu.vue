<template>
  <aside class="aside-menu scroller">
    <router-link
      v-for="menuItem in menuList"
      :key="menuItem.label"
      :to="menuItem.path"
      class="menu-item flex-center"
    >
      <i class="iconfont" :class="menuItem.icon" />
      {{ menuItem.label }}
    </router-link>
  </aside>
</template>

<script>
const menuList = [
  { label: '博客管理', path: '/edit', icon: 'iconedit' },
  { label: '评论回复', path: '/reply', icon: 'iconreply' }
]

export default {
  name: 'AsideMenu',
  setup () {
    return {
      menuList
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
  .menu-item {
    padding: 20px 0 20px 20px;
    display: block;
    text-align: center;
    transition: all 0.5s;
    color: inherit;
    border-right: 5px solid transparent;
    &.router-link-exact-active {
      background-color: #212121;
      color: #14ffec;
      border-right-color: #0d7377;
    }
  }
}
</style>
