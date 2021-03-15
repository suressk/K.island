<template>
  <section v-if="error.statusCode === 404 || error.statusCode === 500" class="not-found">
    <div id="container" class="planet-container"></div>
    <span class="tip absolute-center">
      哇哦，你好像迷路了呢？要不试试 {{ error.statusCode }}
      <nuxt-link class="link" to="/">
        点我
      </nuxt-link>
      回到首页？
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NotFound',
  props: ['error'],
  setup() {

  },
  head () {
    return {
      title: '是不是迷路啦~ | K.island'
    }
  }
})
</script>

<style scoped lang="scss">
//.error,
.not-found {
  width: 100vw;
  height: 100vh;
  position: relative;
  .planet-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
.not-found {
  background-image: url("~@/static/svg/404.svg");
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;
  span {
    top: 85%;
    user-select: none;
    .link {
      color: var(--primary);
    }
  }
}
</style>
