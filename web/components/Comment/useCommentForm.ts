import { ref, reactive, computed, SetupContext, nextTick } from '@nuxtjs/composition-api'
import { checkEmail } from '~/utils/util'
import { CommentProps } from '~/@types'

let timer: number

export default function (props: CommentProps, ctx: SetupContext) {
  const name = ref<string>('')
  const email = ref<string>('')
  const comment = ref<string>('')
  const tipIndex = ref<number>(-1)
  const tipTxt = reactive([
    '您的名字是不是输入全空格啦？',
    '邮箱格式貌似不太对呢~',
    '多说一点儿吧，至少能成一句诗~',
    '偷偷告诉我，你作文是不是 0 分~',
    '胆敢冒充站长，来人，拉出去枪毙五分钟！！',
    '完成验证才可以提交哦~',
    'Submitting...',
    '哇哦！遇到错误，要不再试试？',
    'Successfully completed, Nice!'
  ])

  const disabledSubmit = computed(() => {
    return (name.value === '' || email.value === '' || comment.value === '')
  })

  function handleSubmit () {
    // name 全空格或 Tab 制表符等空字符串
    if (!name.value.trim()) {
      tipIndex.value = 0
      return
    }
    // 邮箱格式不正确
    if (!checkEmail(email.value)) {
      tipIndex.value = 1
      return
    }
    if (comment.value.length < 10) {
      tipIndex.value = 2
      return
    }
    tipIndex.value = 8
    ctx.emit('submit-comment', {
      name: name.value,
      email: email.value,
      comment: comment.value
    })
    nextTick(() => {
      if (timer) clearTimeout(timer)
      timer = window.setTimeout(() => {
        tipIndex.value = -1 // 均满足条件
      }, 2000)
    })
  }

  return {
    name,
    email,
    comment,
    disabledSubmit,
    tipTxt,
    tipIndex,
    handleSubmit
  }
}
