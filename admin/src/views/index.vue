<template>
  <div class="layouts d-flex">
    <aside-menu />

    <main class="main">
      <div class="main-content scroller-light">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <transition name="fadeRightIn">
              <component :is="Component" />
            </transition>
          </keep-alive>
        </router-view>
      </div>

      <KFooter />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AsideMenu from '/@comp/AsideMenu/index.vue'
import KFooter from '/@comp/KFooter.vue'

export default defineComponent({
  name: "Layouts",
  components: { AsideMenu, KFooter }
})
</script>

<style lang="scss">
.layouts {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .main {
    flex: 1;
    padding: 10px 10px 0;
    .main-content {
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      height: calc(100vh - 60px);
    }
  }
}
</style>
