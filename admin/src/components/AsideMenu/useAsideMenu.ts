import { ref, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { Confirm, deleteCookie, removeStorageItem } from '../../utils/util'
import { ACCESS_TOKEN } from '../../store/mutation-types'
import {QuestionCircleOutlined} from '@ant-design/icons-vue'


const menuList = [
    { label: 'Overview', path: '/overview', icon: 'icon-overview' },
    { label: 'Edit Record', path: '/edit', icon: 'icon-send' },
    { label: 'Record List', path: '/list', icon: 'icon-management' },
    { label: 'Comment', path: '/comment', icon: 'icon-reply' },
    { label: 'Message', path: '/message', icon: 'icon-twitter' },
    { label: 'Setting', path: '/setting', icon: 'icon-setting' }
]

export default function useAsideMenu() {
    const router = useRouter()
    // 展开菜单项
    const extendMenu = ref<boolean>(true)

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
        handleExit
    }
}
