<template>
  <div class="k-about">
    <Header />
    <div class="content">
      你好，我是 K.
    </div>

    <Footer />
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
