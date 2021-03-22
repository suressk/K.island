<template>
  <!--  页脚  -->
  <footer class="footer flex-between">
    <span class="tip txt-overflow">K.island</span>
    <span class="tip txt-overflow">嗐 | 好久不见</span>
    <span class="tip txt-overflow">
        <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42282302422860"
            target="_blank"
        >
          鄂公安备 42282302422860
        </a>
    </span>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "KFooter"
})
</script>

<style lang="scss">
.footer {
  user-select: none;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  color: #808080;
  font-size: 12px;
  margin: 0 10px;
  a {
    color: inherit;
  }
}
</style>
