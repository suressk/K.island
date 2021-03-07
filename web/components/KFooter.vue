<template>
  <footer class="k-footer flex-center">
    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42282302422860" target="_blank" class="link tip">
      鄂公安备 42282302422860
    </a>
    <span class="tip">鄂 ICP 备 20006909 号</span>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
.k-footer {
  position: relative;
  z-index: 1;
  background-color: var(--white);
  padding: 10px 0;
  height: 40px;
  .tip {
    padding: 0 10px;
    font-size: 12px;
    &:first-child {
      margin-left: -10px;
    }
  }
  .link {
    transition: color .3s;
    border-right: 1px solid var(--tipColor);
    &:hover {
      color: var(--primary-blue);
    }
  }
}
</style>
