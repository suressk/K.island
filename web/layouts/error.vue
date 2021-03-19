<template>
  <section v-if="error.statusCode === 404 || error.statusCode === 500" class="not-found">
    <div id="container" class="planet-container"></div>
    <span class="tip absolute-center">
      哇哦，你好像迷路了呢？要不试试 {{ error.statusCode }}
      <nuxt-link class="link" to="/">
        点我
      </nuxt-link>
      回到首页？
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import * as THREE from 'three'
// import render, { initPlanet } from '~/components/planet'
// @ts-ignore
let camera, scene, renderer, geometry, material, mesh

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;
  scene = new THREE.Scene();
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);
}

function animation(time: number) {
  // @ts-ignore
  mesh.rotation.x = time / 2000;
  // @ts-ignore
  mesh.rotation.y = time / 1000;
  // @ts-ignore
  renderer.render(scene, camera);
}

export default defineComponent({
  name: 'NotFound',
  props: ['error'],
  setup() {
    onMounted(() => {
      // init()

      // initPlanet()
      // render()
    })
  },
  head() {
    return {
      title: '是不是迷路啦~ | K.island'
    }
  }
})
</script>

<style scoped lang="scss">
//.error,
.not-found {
  width: 100vw;
  height: 100vh;
  position: relative;

  .planet-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.not-found {
  background-image: url("~@/static/svg/404.svg");
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;

  span {
    top: 85%;
    user-select: none;

    .link {
      color: var(--primary);
    }
  }
}
</style>
