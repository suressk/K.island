<template>
  <aside class="aside-menu" :class="{ shrink: !extendMenu }">
    <div class="avatar flex-center">
      <img src="../../assets/images/avatar.png" alt="avatar" />
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

    <a-badge :count="unread" style="width: 100%;">
      <router-link to="/comments" class="menu-item d-flex txt-overflow">
        <i class="iconfont icon-send" />
        <span v-show="extendMenu">Comments</span>
      </router-link>
    </a-badge>

    <router-link to="/setting" class="menu-item d-flex txt-overflow">
      <i class="iconfont icon-setting" />
      <span v-show="extendMenu">Setting</span>
    </router-link>

    <span class="menu-item d-flex txt-overflow" @click="handleExit">
      <i class="iconfont icon-exit" />
      <span v-show="extendMenu">Exit</span>
    </span>

    <a-switch class="switch" v-model:checked="extendMenu" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useAsideMenu from './useAsideMenu'
import { Switch, Badge } from 'ant-design-vue'

export default defineComponent({
  name: "AsideMenu",
  components: {
    'a-switch': Switch,
    'a-badge': Badge
  },
  props: {
    commentNum: {
      type: [Number, String],
      default: 0
    }
  },
  setup() {
    return {
      ...useAsideMenu()
    }
  }
})
</script>

<style lang="scss">
// .aside-menu {
//   width: 200px;
//   height: 100vh;
//   background-color: var(--primary);
//   padding: 20px 0;
//   color: #fff;

.aside-menu {
  width: 200px;
  height: 100vh;
  background-color: var(--primary);
  padding: 20px 0;
  color: #fff;
  position: relative;
  flex-shrink: 0;
  transition: width 0.5s ease, border-radius 0.5s ease;
  border-radius: 0 20px 20px 0;
  &.shrink {
    width: 40px;
    border-radius: 0 5px 5px 0;
    .menu-item {
      padding: 10px 5px;
    }
  }
  .avatar {
    width: 60%;
    border-radius: 50%;
    margin: 20px auto;
    overflow: hidden;
    border: 5px solid var(--blue-border);
    img {
      width: 100%;
    }
  }
  .menu-item {
    padding: 10px 0 10px 30px;
    color: inherit;
    border-right: 3px solid transparent;
    font-size: 14px;
    transition: all 0.3s ease;
    cursor: pointer;
    margin-bottom: 3px;
    position: relative;
    &.router-link-exact-active,
    &:hover {
      background-color: #fff;
      color: var(--primary);
      border-right-color: var(--primary);
    }
    .iconfont {
      padding: 5px 10px 5px 5px;
      font-size: 13px;
      transition: unset;
    }
  }
  .switch {
    position: absolute;
    width: 22px;
    min-width: unset;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    &.ant-switch-checked {
      background-color: var(--blue-border);
    }
    &::after {
      background-color: transparent;
    }
  }
}
</style>