<template>
  <button class="k-button">
    <slot>按钮</slot>
  </button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style lang="less">
.k-button {
  background-color: #409EFF;
}
</style>
