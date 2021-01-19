<template>
  <section v-if="error.statusCode === 404" class="not-found">
    <span class="tip absolute-center">
      哇哦，你好像迷路了呢？要不试试
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
  head () {
    return {
      title: '是不是迷路啦~~'
    }
  }
}
</script>

<style scoped lang="scss">
.not-found {
  width: 100vw;
  height: 100vh;
  background-image: url("~@/static/svg/404.svg");
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  span {
    top: 85%;
    user-select: none;
    .link {
      color: var(--cyanogen);
    }
  }
}
</style>
