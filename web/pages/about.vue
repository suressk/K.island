<template>
  <div class="k-about">
    <KHeader />
    <div class="content">
      你好，我是 K.
    </div>

    <KFooter />
  </div>
</template>

<script>
export default {
  name: 'About',
  head () {
    return {
      title: "Hi!I'm K. | K.island"
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/css/pages/about.scss";
</style>
