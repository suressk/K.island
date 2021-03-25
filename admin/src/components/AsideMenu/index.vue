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
    <span class="menu-item d-flex txt-overflow" @click="handleExit">
      <i class="iconfont icon-exit"/>
      <span v-show="extendMenu">Exit</span>
    </span>

    <a-switch class="switch" v-model:checked="extendMenu" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useAsideMenu from './useAsideMenu'
import { Switch } from 'ant-design-vue'

// import SvgIcons from '../SvgIcons.vue'
// <SvgIcons :name="menuItem.icon" />
// SvgIcons

export default defineComponent({
  name: "AsideMenu",
  components: {
    'a-switch': Switch
  },
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
  width: 200px;
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
    border: 5px solid var(--blue-border);
    img {
      width: 100%;
    }
  }
  .menu-item {
    padding: 10px 0 10px 30px;
    color: inherit;
    border-right: 5px solid transparent;
    font-size: 14px;
    transition: all .5s;
    cursor: pointer;
    margin-bottom: 3px;
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
  &.shrink {
    width: 40px;
    .menu-item {
      padding: 10px 5px;
      //.svg-icon {
      //  margin-right: 0;
      //}
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
