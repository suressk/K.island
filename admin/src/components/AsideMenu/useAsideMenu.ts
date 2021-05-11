import {ref, computed, createVNode} from 'vue'
import {useRouter} from 'vue-router'
import {Confirm, deleteCookie, removeStorageItem} from '../../utils/util'
import {ACCESS_TOKEN, UNREAD} from '../../store/mutation-types'
import {QuestionCircleOutlined} from '@ant-design/icons-vue'
import store from '../../store'

const menuList = [
    {label: 'Overview', path: '/overview', icon: 'icon-overview'},
    {label: 'Edit Article', path: '/edit', icon: 'icon-edit'},
    {label: 'Article List', path: '/list', icon: 'icon-article'},
    {label: 'Messages', path: '/messages', icon: 'icon-twitter'},
    {label: 'Subscriptions', path: '/subscribes', icon: 'icon-subscribe'}
]

export default function useAsideMenu() {
    const router = useRouter()
    // 展开菜单项
    const extendMenu = ref<boolean>(true)

    const unread = computed(() => store.state[UNREAD])

    function handleExit() {
        Confirm({
            type: 'warning',
            title: 'Confirm',
            icon: createVNode(QuestionCircleOutlined),
            content: 'Are you sure to exit ?',
            onOk: () => {
                removeStorageItem(ACCESS_TOKEN)
                deleteCookie(ACCESS_TOKEN)
                setTimeout(() => {
                    router.push('/login')
                }, 500)
            },
            onCancel: () => undefined
        })
    }

    return {
        menuList,
        extendMenu,
        unread,
        handleExit
    }
}
