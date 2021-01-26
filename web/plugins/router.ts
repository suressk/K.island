// @ts-ignore
// export default ({ app: { router }, store }) => {
//   // console.log('store: ============', store)
//   // 前置守卫 => loader 显示加载状态
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   router.beforeEach((to: any, from: any, next: () => void) => {
//     // document.querySelector('.loader').style.display = 'flex'
//     next()
//   })

//   // 后置守卫 => loader 隐藏
//   router.afterEach((to: any, from: any) => {
//     console.log('afterEach from: ', from)
//     console.log('afterEach to: ', to)
//     // setTimeout(() => {
//     //   // document.querySelector('.loader').style.display = 'none'
//     // }, 1000)
//   })
// }
export default () => {}