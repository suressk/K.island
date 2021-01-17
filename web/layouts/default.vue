<template>
  <Nuxt class="trans-all-05" keep-alive :keep-alive-props="{include: includeArr}" />
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
