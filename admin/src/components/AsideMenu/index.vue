<template>
  <aside class="aside-menu scroller-light" :class="{ shrink: !extendMenu }">
    <div class="avatar flex-center">
      <img src="../../assets/images/avatar.png" alt="avatar">
    </div>
    <router-link
        v-for="menuItem in menuList"
        :key="menuItem.label"
        :to="menuItem.path"
        class="menu-item d-flex txt-overflow"
    >
      <i class="iconfont" :class="menuItem.icon"/>
      <span v-show="extendMenu">{{ menuItem.label }}</span>
    </router-link>
    <span class="menu-item d-flex txt-overflow" @click="handleLogout">
      <i class="iconfont icon-logout"/>
      <span v-show="extendMenu">Exit</span>
    </span>
    <el-switch
        class="extend-switch"
        v-model="extendMenu"
        active-color="#14ffec"
        inactive-color="#d9d9d9"
    />
  </aside>
</template>

<script>
import { defineComponent } from 'vue'
import useAsideMenu from './useAsideMenu'

export default defineComponent({
  name: "AsideMenu",
  props: {
    commentNum: {
      type: [Number, String],
      default: 0
    }
  },
  setup() {
    return {...useAsideMenu()}
  }
})
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
    width: 20px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}
</style>
