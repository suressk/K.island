import { computed, reactive, ref, nextTick, onMounted } from '@nuxtjs/composition-api'
import { checkIsEmail, getStorageItem } from '~/utils/util'
import { AuthorInfo, COMMENT_USER } from '~/store/mutation-types'

/* 匹配本人邮箱 */
function matchAuthorEmail(email: string) {
  switch (email) {
    case AuthorInfo.qq:
    case AuthorInfo.QQ:
    case AuthorInfo.gmail:
    case AuthorInfo.outlook:
      return true
    default:
      return false
  }
}

interface CommentUserInfo {
  name: string
  email: string
}

/**
 * 获取 localstorage 存储的评论人信息
 * */
function getLocalUserInfo(): CommentUserInfo {
  return (getStorageItem<CommentUserInfo>(COMMENT_USER) || { name: '', email: '' })
}

/**
 * TODO =====> add comment => validate myself
 * */
export default function() {

  const commentInfo = reactive({
    name: '',
    email: '',
    comment: ''
  })
  const tipIndex = ref<number>(-1)
  const tipTxt = reactive([
    '昵称不能是空白哦~',
    '昵称太长辣~ （十个字符以内）',
    '邮箱格式貌似不太对呢~',
    '胆敢冒充站长？！拉出去枪毙五分钟！！！',
    '要不多写一点儿吧？！至少四字能成词嘛~',
    'Submitting...',
    '哇哦！遇到错误辣，要不扥会儿再试试？',
    'Successfully completed, Nice!'
  ])

  /*
  * 0: empty nickname
  * 1: too long nickname
  * 2: invalid email
  * 3: not author
  * 4: comment content too short
  * 5: error Response
  * 6: submitting...
  * 7: success Response
  *  */

  // 初始化评论人信息
  onMounted(() => {
    const userInfo = getLocalUserInfo()
    commentInfo.name = userInfo.name
    commentInfo.email = userInfo.email
  })

  const disabledSubmit = computed(() => {
    return (commentInfo.name.trim() === '' || commentInfo.email.trim() === '' || commentInfo.comment.trim() === '')
  })

  function validateForm() {
    return new Promise((resolve, reject) => {
      // name 全空格或 Tab 制表符等空字符串
      if (!commentInfo.name.trim()) {
        reject(0)
        return
      } else if (commentInfo.name.trim().length > 10) {
        reject(1)
        return
      }
      // 邮箱格式不正确
      if (!checkIsEmail(commentInfo.email.trim())) {
        reject(2)
        return
      } else if (matchAuthorEmail(commentInfo.email.trim())) {
        reject(3)
        // TODO 小K. 的邮箱，我自己发评论（需单独验证）
        return
      }
      if (commentInfo.comment.trim().length < 5) {
        reject(4)
        return
      }
      resolve(5) /* success */
    })
  }

  return {
    commentInfo,
    disabledSubmit,
    tipTxt,
    tipIndex,
    validateForm
  }
}
