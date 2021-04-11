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
import { addListener, removeListener, throttle } from '~/utils/util'
import QRCode from 'qrcode'

export default function useHeader(props: any) {
  const vm = getCurrentInstance()!
  let audio: HTMLAudioElement | null = null
  const showTitle = ref<boolean>(false)
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
    if (scrollTop >= 100) {
      viewProgress.value = 100 * (scrollTop + winHeight) / scrollHeight + '%'
      !showTitle.value && (showTitle.value = true)
      return
    }
    viewProgress.value = '0'
    showTitle.value && (showTitle.value = false)
  }

  function updateMusicProgress () {
    const currentTime = audio!.currentTime
    const totalTime = audio!.duration
    musicProgress.value = (currentTime / totalTime) * 100 + '%'
    rafId = window.requestAnimationFrame(updateMusicProgress)
  }

  // Toggle to play music
  function handleTogglePlayMusic () {
    if (!audio) return
    playing.value = !playing.value
    // being playing
    if (playing.value) {
      audio.play()
      rafId = window.requestAnimationFrame(updateMusicProgress)
    } else {
      audio.pause()
      rafId && window.cancelAnimationFrame(rafId)
    }
  }

  const fnScroll = throttle(handleScroll, 100)

  onMounted(() => {
    audio = vm.refs.musicRef as HTMLAudioElement
    const qrCodeContainer = document.getElementById('qrcode') as HTMLCanvasElement
    QRCode.toCanvas(qrCodeContainer, window.location.href)
    props.needScroll && addListener(document, 'scroll', fnScroll)
  })
  onBeforeUnmount(() => {
    props.needScroll && removeListener(document, 'scroll', fnScroll)
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
