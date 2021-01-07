<template>
  <div v-show="loading" class="loading">
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading{
  position: fixed;
  z-index: 9999;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading span{
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background: lightgreen;
  transform-origin: right bottom;
  animation: load 1s ease infinite;
}
.loading span:last-child{
  margin-right: 0;
}
@keyframes load{
  0%{
    opacity: 1;
    transform: scale(1);
  }
  100%{
    opacity: 0;
    transform: rotate(90deg) scale(.3);
  }
}
.loading span:nth-child(1){
  animation-delay:0.13s;
}
.loading span:nth-child(2){
  animation-delay:0.26s;
}
.loading span:nth-child(3){
  animation-delay:0.39s;
}
.loading span:nth-child(4){
  animation-delay:0.52s;
}
.loading span:nth-child(5){
  animation-delay:0.65s;
}
</style>
