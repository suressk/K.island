<template>
  <section v-if="error.statusCode === 404" class="not-found">
    <canvas ref="nCanvas" width="100%" height="100%"></canvas>
    <span class="tip absolute-center">
      哇哦，你好像迷路了呢？要不试试 {{ error.statusCode }}
      <nuxt-link class="link" to="/">
        点我
      </nuxt-link>
      回到首页？
    </span>
  </section>
  <section v-else-if="error.statusCode === 500" class="error">
    <canvas ref="eCanvas" width="100%" height="100%"></canvas>
    <span class="tip absolute-center">
      哇哦，你好像迷路了呢？要不试试 {{ error.statusCode }}
      <nuxt-link class="link" to="/">
        点我
      </nuxt-link>
      回到首页？
    </span>
  </section>
</template>

<script>

export default {
  name: 'NotFound',
  props: ['error'],
  data() {
    return {
      ctx: null
    }
  },
  head () {
    return {
      title: '是不是迷路啦~ | K.island'
    }
  },
  methods: {
    initCtx() {
      if (this.error.statusCode === 500) {
        this.$refs.eCanvas.width = window.innerWidth
        this.$refs.eCanvas.height = window.innerHeight
        this.ctx = this.$refs.eCanvas.getContext('2d')
      } else if (this.error.statusCode === 404) {
        this.$refs.nCanvas.width = window.innerWidth
        this.$refs.nCanvas.height = window.innerHeight
        this.ctx = this.$refs.nCanvas.getContext('2d')
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped lang="scss">
.error,
.not-found {
  width: 100vw;
  height: 100vh;
  position: relative;
  canvas {
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
