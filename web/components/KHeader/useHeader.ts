/**
 * Header component
 * */
import {
  ref,
  computed,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount
} from '@nuxtjs/composition-api'
import { addListener, removeListener, throttle, warnNotify } from '~/utils/util'
import QRCode from 'qrcode'

export default function useHeader(props: any) {
  const vm = getCurrentInstance()!
  let audio: HTMLAudioElement | null = null
  const showTitle = ref<boolean>(false)
  const canPlay = ref<boolean>(false)
  const playing = ref<boolean>(false)
  const musicProgress = ref<string>('0')
  const viewProgress = ref<string>('0')

  const playIcon = computed(() => {
    return playing.value ? 'icon-paused': 'icon-play'
  })

  let rafId: null | number = null

  function handleScroll () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.offsetHeight || document.body.offsetHeight
    const winHeight = window.innerHeight
    // 滚动位置指示条宽度取整数百分比
    viewProgress.value = Math.round(100 * (scrollTop + winHeight) / scrollHeight) + '%'
    if (scrollTop >= 100) {
      !showTitle.value && (showTitle.value = true)
      return
    }
    // 滚动距离小于 100px，滚动指示条宽度置为 0
    viewProgress.value = '0'
    showTitle.value && (showTitle.value = false)
  }

  function updateMusicProgress () {
    const currentTime = audio!.currentTime || 0
    const totalTime = audio!.duration || 0
    musicProgress.value = (currentTime / totalTime) * 100 + '%'
    rafId = window.requestAnimationFrame(updateMusicProgress)
  }

  // Toggle to play music
  function handleTogglePlayMusic () {
    if (!audio || !canPlay.value) {
      return warnNotify('音乐可能加载失败辣~', 2000)
    }
    // playing ? icon-paused : icon-play
    playing.value = !playing.value
    if (playing.value) {
      audio.play()
      rafId = window.requestAnimationFrame(updateMusicProgress)
    } else {
      audio.pause()
      rafId && window.cancelAnimationFrame(rafId)
    }
  }

  const fnScroll = throttle(handleScroll, 100)

  const listenMusicLoaded = () => {
    canPlay.value = true
  }

  onMounted(() => {
    audio = vm.refs.musicRef as HTMLAudioElement
    addListener(audio, 'canplaythrough', listenMusicLoaded)
    const qrCodeContainer = document.getElementById('qrcode') as HTMLCanvasElement
    QRCode.toCanvas(qrCodeContainer, window.location.href)
    props.needScroll && addListener(document, 'scroll', fnScroll)
  })

  onBeforeUnmount(() => {
    props.needScroll && removeListener(document, 'scroll', fnScroll)
    removeListener(audio as HTMLAudioElement, 'canplaythrough', listenMusicLoaded)
  })
  return {
    showTitle,
    playing,
    playIcon,
    viewProgress,
    musicProgress,
    handleTogglePlayMusic
  }
}
