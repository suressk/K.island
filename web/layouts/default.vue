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
