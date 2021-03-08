<template>
  <Nuxt class="k-page" keep-alive :keep-alive-props="{include: includeArr}" />
</template>

<script>
export default {
  data () {
    return {
      includeArr: ['index', 'about']
    }
  }
}
</script>

<style lang="scss">
.k-page {
  transition: transform 0.5s ease, opacity 0.3s ease 0.2s;
}
</style>
