import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { Confirm, deleteCookie, removeStorageItem } from '../../utils/util'
// import { ACCESS_TOKEN } from '../../store/mutation-types'


const menuList = [
    { label: 'Overview', path: '/overview', icon: 'icon-overview' },
    { label: 'Edit Record', path: '/edit', icon: 'icon-edit' },
    { label: 'Record List', path: '/list', icon: 'icon-management' },
    { label: 'Comment', path: '/comment', icon: 'icon-reply' },
    { label: 'Message', path: '/message', icon: 'icon-reply' }
]

export default function useAsideMenu() {
    const router = useRouter()
    // 展开菜单项
    const extendMenu = ref<boolean>(true)

    function handleLogout() {
        // Confirm({
        //
        // }).then(() => {
        //     removeStorageItem(ACCESS_TOKEN)
        //     deleteCookie(ACCESS_TOKEN)
        //     // 1s 后跳转到登录页
        //     setTimeout(() => {
        //         router.push('/login')
        //     }, 500)
        // }).catch(() => undefined)
    }

    return {
        menuList,
        extendMenu,
        handleLogout
    }
}
