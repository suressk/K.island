import {
    // defineComponent,
    ref,
    onMounted,
    reactive,
    onBeforeUnmount,
    onGlobalSetup
    // computed,
    // watch,
    // getCurrentInstance,
    // PropType
} from '@nuxtjs/composition-api'
// @ts-ignore
import Parallax from 'parallax-js'
import Notification from '../components/notification'
import { throttle } from '../utils/util'

interface IStyleOption {
    [prop: string]: string;
}

// let layerStyle: IStyleOption = {}
// let coverStyle: IStyleOption = {}
/**
 * 首页 composition-api 写法抽离
 */
export default function useIndex () {
    const sceneHeight = ref<string>('100%')
    const sceneWidth = ref<string>('100%')
    const showNav = ref<boolean>(false)
    let layerStyle = reactive<IStyleOption>({})
    let coverStyle = reactive<IStyleOption>({})

    // const { proxy } = getCurrentInstance()

    // 封面图宽高及位置计算
    function computeCover () {
        const width = parseInt(layerStyle.width)
        const height = parseInt(layerStyle.height)
        const scale = 1080 / 1920
        const style: IStyleOption = {}
        const needCompute = height / width > scale
        style.width = needCompute ? `${height / scale}px` : `${width}px`
        style.height = needCompute ? `${height}px` : `${width * scale}px`
        style.left = (width - parseInt(style.width)) / 2 + 'px'
        style.top = (height - parseInt(style.height)) / 2 + 'px'
        // coverStyle = reactive({ ...coverStyle, ...style })
        coverStyle.width = style.width //  = { ...layerStyle, ...style }
        coverStyle.height = style.height
        coverStyle.marginLeft = style.left
        coverStyle.marginTop = style.top
    }

    // 封面图父级框宽高及位置计算
    function computeLayer () {
        const sceneW = parseInt(sceneWidth.value)
        const sceneH = parseInt(sceneHeight.value)
        const e = (sceneW > 1000 || sceneH > 1000) ? 1000 : 500
        let x, y, i
        if (sceneW >= sceneH) {
          i = sceneW / e * 50
          y = i
          x = i * sceneW / sceneH
        } else {
          i = sceneH / e * 50
          x = i
          y = i * sceneH / sceneW
        }
        const style = {
          width: sceneW + x + 'px',
          height: sceneH + y + 'px',
          marginLeft: -0.5 * x + 'px',
          marginTop: -0.5 * y + 'px'
        }
        // layerStyle = reactive({ ...layerStyle, ...style })
        layerStyle.width = style.width //  = { ...layerStyle, ...style }
        layerStyle.height = style.height
        layerStyle.marginLeft = style.marginLeft
        layerStyle.marginTop = style.marginTop
        computeCover()
    }

    function init () {
        sceneHeight.value = document.documentElement.clientHeight + 'px'
        sceneWidth.value = document.documentElement.clientWidth + 'px'
        computeLayer()
    }

    function handleToggleNav () {
        showNav.value = !showNav.value
    }

    function handleNotify () {
        Notification({
            type: 'error',
            title: '测试',
            message: 'Just test the notify methods'
        })
    }

    onMounted(() => {
        init()
        // 图片根据鼠标方向略微偏移
        new Parallax(document.getElementById('scene'), {
            relativeInput: true,
            clipRelativeInput: true
        })
        const windowResize = throttle(init, 100)
        window.onresize = () => {
            windowResize()
        }
    })

    onBeforeUnmount(() => {
        window.onresize = null
    })

    return {
        showNav,
        sceneHeight,
        layerStyle,
        coverStyle,
        handleToggleNav,
        handleNotify
    }
}