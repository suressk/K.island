<template>
  <div class="back-to-top">
    <i class="iconfont icon-top" />
  </div>
</template>

<script>
export default {
  name: 'BackToTop'
}
</script>

<style lang="scss">
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 30px;
  cursor: pointer;
  opacity: 0;
  transition: all .3s;
  z-index: 1;
}
</style>
