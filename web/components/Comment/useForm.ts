import { computed, reactive, ref, watch, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import { checkIsEmail, getStorageItem, setStorageItem } from '~/utils/util'
import { AuthorInfo, COMMENT_USER } from '~/store/mutation-types'
import md5 from 'md5'

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

export default function() {
  const commentInfo = reactive({
    name: '',
    email: '',
    comment: '',
    verification: ''
  })
  const tipIndex = ref<number>(-1)
  const tipTxt = reactive([
    '昵称不能是空白哦~',
    '昵称太长辣~ （十个字符以内）',
    '邮箱格式貌似不太对呢~',
    '胆敢冒充站长？！拉出去枪毙五分钟！！！',
    '要不多写一点儿吧？！至少四字能成词嘛~',
    '哇哦！遇到错误辣，要不等会儿再试试？',
    'Submitting...',
    'Successfully completed, Nice!'
  ])

  const showVerify = ref<boolean>(false)

  const stopWatch = watch(() => commentInfo.email, (email: string) => {
    showVerify.value = matchAuthorEmail(email)
  })

  /*
  * 0: empty nickname
  * 1: too long nickname
  * 2: invalid email
  * 3: not author
  * 4: comment content too short
  * 5: error Response
  * 6: submitting...
  * 7: success Response
  * */

  const tipClass = computed(() => {
    switch (tipIndex.value) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return 'error-tip'
      case 6:
        return 'info-tip'
      case 7:
        return 'success-tip'
      default:
        return ''
    }
  })
  const tipContent = computed(() => {
    return tipIndex.value > -1 ? tipTxt[tipIndex.value] : ''
  })
  const submitting = computed(() => tipIndex.value === 6)

  function getCommentUser() {
    const userInfo = getLocalUserInfo()
    commentInfo.name = userInfo.name
    commentInfo.email = userInfo.email
  }

  function saveCommentUser() {
    const userInfo = getLocalUserInfo()
    if (
      commentInfo.name === userInfo.name &&
      commentInfo.email === userInfo.email
    ) {
      return
    }
    setStorageItem<CommentUserInfo>(COMMENT_USER, { name: commentInfo.name, email: commentInfo.email })
  }

  function clearCommentInfo() {
    commentInfo.comment = ''
    // commentInfo.verification = ''
  }

  // 初始化评论人信息
  onMounted(() => {
    getCommentUser()
  })

  onUnmounted(() => {
    stopWatch()
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
      } else if (
        matchAuthorEmail(commentInfo.email.trim()) &&
        md5(commentInfo.verification.trim()) !== AuthorInfo.verification
      ) {
        console.log('verification: ', md5(commentInfo.verification.trim()))
        // 小K. 的邮箱，但验证信息不对
        reject(3)
        return
      }
      if (commentInfo.comment.trim().length < 5) {
        reject(4)
        return
      }
      resolve(6) /* success => submitting */
    })
  }

  return {
    commentInfo,
    showVerify,
    disabledSubmit,
    tipContent,
    tipIndex,
    submitting,
    tipClass,
    validateForm,
    getCommentUser,
    saveCommentUser,
    clearCommentInfo
  }
}
