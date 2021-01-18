<template>
  <header class="k-header flex-between">
    <h1 class="k-logo flex-center">
      <nuxt-link to="/">
        K.
      </nuxt-link>
    </h1>
    <ul class="header-r-nav flex-center">
      <li class="r-nav-item">
        <i class="iconfont icon-qrcode" />
      </li>
      <li class="r-nav-item">
        <nuxt-link class="link flex-center" to="/about">
          <img class="avatar" src="~@/static/images/avatar.png" alt="K.">
        </nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    // 简单的编程式跳转或使用 nuxt-link 组件
    handleToPage (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="scss">
.k-header {
  height: 50px;
  margin-bottom: 20px;
  padding: 0 20px;
  //border-bottom: 1px solid var(--lightBg);
  background-color: var(--lightBg);
  .k-logo {
    background-image: url("~@/static/images/logo.svg");
    background-size: 36px;
    background-position: 10px, 0;
    width: 60px;
    background-repeat: no-repeat;
    height: 100%;
    cursor: pointer;
    color: transparent;
  }
  // 右侧菜单项
  .header-r-nav,
  .r-nav-item,
  .link {
    height: 100%;
    .avatar {
      height: 80%;
      border-radius: 50%;
    }
  }
  .r-nav-item {
    padding: 0 6px;
    cursor: pointer;
  }
}
</style>
