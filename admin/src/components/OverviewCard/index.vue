<template>
  <div class="card">
    <h4 class="card-header">{{ title }}</h4>

    <div class="card-content">
      <slot />
      <slot name="tip" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "OverviewCard",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
})
</script>