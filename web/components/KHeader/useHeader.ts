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
import { domainUrl } from '~/plugins/axios'
// import QRCode from 'qrcode'

export default function useHeader(props: any) {
  const vm = getCurrentInstance()!
  let audio: HTMLAudioElement | null = null
  const showTitle = ref<boolean>(false)
  const canPlay = ref<boolean>(false)
  const playing = ref<boolean>(false)
  const musicProgress = ref<string>('0')
  const viewProgress = ref<string>('0')

  const playIcon = computed(() => {
    return playing.value ? 'icon-paused' : 'icon-play'
  })

  const defaultMusic = computed(() => `${domainUrl}/uploads/music/momentaryEternity.mp3`) // 默认不会变（不必为计算属性）

  let rafId: null | number = null

  function handleScroll() {
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

  function updateMusicProgress() {
    const currentTime = audio!.currentTime || 0
    const totalTime = audio!.duration || 0
    musicProgress.value = ((currentTime / totalTime) * 100).toFixed(2) + '%'
    rafId = window.requestAnimationFrame(updateMusicProgress)
  }

  // Toggle to play music
  function toggleMusic() {
    if (!audio || !canPlay.value) {
      return warnNotify('音乐加载失败，人家不给免费获取音乐资源了~', 4000)
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

  // const listenMusicLoaded = () => {
  //   canPlay.value = true
  // }

  // 初始化时仅重载一次
  const loadMusicAgain = async () => {
    // music 加载失败，duration 为 NaN；否则为音乐时长(number)
    if (!isNaN(audio!.duration)) return

    const loadPro: Promise<boolean> = new Promise(resolve => {
      audio!.ondurationchange = () => {
        !isNaN(audio!.duration) && resolve(true)
      }
    })

    await audio!.load() // reload music

    loadPro.then(() => {
      // successfully reload
      canPlay.value = true
    })
  }

  onMounted(() => {
    audio = vm.refs.musicRef as HTMLAudioElement

    // 手机端貌似不能监听到此事件触发，从而导致音乐无法播放，故改用时长判断去重载音乐
    // addListener(audio, 'canplaythrough', listenMusicLoaded)

    // const qrCodeContainer = vm.refs.qrcodeRef as HTMLCanvasElement
    // QRCode.toCanvas(qrCodeContainer, window.location.href)
    props.needScroll && addListener(document, 'scroll', fnScroll)

    setTimeout(() => {
      // 初次 load music 失败 重载一次
      if (isNaN(audio!.duration)) {
        loadMusicAgain()
        return
      }
      canPlay.value = true
    });
  })

  onBeforeUnmount(() => {
    props.needScroll && removeListener(document, 'scroll', fnScroll)
    // removeListener(audio as HTMLAudioElement, 'canplaythrough', listenMusicLoaded)
  })
  return {
    showTitle,
    playing,
    playIcon,
    defaultMusic,
    viewProgress,
    musicProgress,
    toggleMusic
  }
}
