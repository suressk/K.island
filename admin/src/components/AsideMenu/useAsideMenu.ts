import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { Confirm, deleteCookie, removeStorageItem } from '../../utils/util'
// import { ACCESS_TOKEN } from '../../store/mutation-types'


const menuList = [
    { label: 'Overview', path: '/overview', icon: 'icon-overview' },
    { label: 'Edit Record', path: '/new', icon: 'icon-add' },
    { label: 'Record List', path: '/list', icon: 'icon-management' },
    { label: 'Reply', path: '/reply', icon: 'icon-reply' }
]

export default function useAsideMenu() {
    const router = useRouter()
    // 展开菜单项
    const extendMenu = ref<boolean>(true)

    function handleLogout() {
        // Confirm('warning', '', 'Sure to logout ?').then(() => {
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
