<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: "SvgIcons",
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  }
})
</script>

<style lang="scss">
.svg-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
