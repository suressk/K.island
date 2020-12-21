<template>
  <aside class="aside-menu">
    <router-link
      v-for="menuItem in menuList"
      :key="menuItem.label"
      :to="menuItem.path"
    >{{ menuItem.label }}</router-link>
  </aside>
</template>

<script>
const menuList = [
  { label: '博客管理', path: '/edit', icon: 'icon-edit' }
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

<style lang="scss">
.aside-menu {
  width: 200px;
  height: calc(100vh - 60px);
  background-color: #fff;
  padding: 20px 0 20px 20px;
}
</style>
