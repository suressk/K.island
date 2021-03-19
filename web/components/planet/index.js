import * as THREE from 'three'
// import { RenderPass } from './RenderPass'

let planet, asteroids

export function initPlanet () {
  debugger
  // 窗口宽高
  const width = window.innerWidth
  const height = window.innerHeight
  // 宽高比
  const aspect = width / height
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
  camera.position.z = 500

  const system = new THREE.Group() // planetary system

  scene.add( new THREE.AmbientLight(0xFFFFFF, 0.2) )

  const light = new THREE.DirectionalLight(0xFFFFFF, 2.5)
  light.position.set(1500, 2500, 0)
  scene.add(light)

  const material = new THREE.MeshLambertMaterial({
    color: 0x0C2D4D
  })

  planet = new THREE.Mesh(
    new THREE.IcosahedronGeometry(100, 3),
    material
  )

  // TODO ================= vertices is undefined
  for (let i = 0; i < planet.geometry.vertices.length; i++) {
    planet.geometry.vertices[i].multiplyScalar(
      Math.random() * 0.05 + 0.95
    )
  }

  planet.geometry.computeFlatVertexNormals()
  system.add(planet)

  asteroids = new THREE.Group()

  for (let p = 0; p < Math.PI * 2; p = p + Math.random() * 0.15) {
    const asteroid = new THREE.Mesh(new THREE.IcosahedronGeometry(8, 0), material)

    const size = Math.random() * 0.5
    const len = asteroid.geometry.vertices.length
    for (let i = 0; i < len; i++) {
      asteroid.geometry.vertices[i].multiplyScalar(  Math.random() * 0.5 + size )
    }

    const rand = Math.random() * 60 - 30 // [-30, 30]
    asteroid.position.set(200 * Math.sin(p) + rand, rand, 200 * Math.cos(p) + rand)

    asteroid.geometry.computeFlatVertexNormals()
    asteroids.add(asteroid)
  }

  system.add(asteroids)

  system.rotation.x = 0.1
  system.rotation.y = -.3
  system.rotation.z = -0.4

  scene.add(system)

  for (let i = 0; i < 10; i++) {
    const particles = new THREE.Points(
      new THREE.BoxGeometry(),
      new THREE.PointsMaterial({
        size: Math.random() * 5
      })
    )
    for (let j = 0; j < 20; j++) {
      const vertex = new THREE.Vector3()
      vertex.x = Math.random() * width * 1.1 - width * 1.1 / 2
      vertex.y = Math.random() * height * 1.1 - height * 1.1 / 2
      vertex.z = -500
      particles.geometry.vertices.push(vertex)
      particles.material.color.setScalar(Math.random() * 0.4 + 0.2)
    }
    scene.add(particles)
  }
}

export default function render() {
  requestAnimationFrame(render)

  planet.rotation.y += 0.001
  planet.rotation.z -= 0.0005

  asteroids.rotation.y += 0.003

  renderer.render(scene, camera)
}
