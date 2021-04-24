import { reactive, ref, getCurrentInstance, nextTick, onMounted } from '@nuxtjs/composition-api'
import { AuthorInfo } from '~/store/mutation-types'
import { CommentItem } from '~/types'
import { errorNotify, successNotify, warnNotify } from '~/utils/util'
import useForm from './useForm'

type CommentPropsParams = {
  commentList: CommentItem[]
  articleId: number
}

type MentionsInfo = {
  toName: null | string
  toEmail: null | string
  parentId: null | number
  topicId: null | string
}

function waitForCalling(func: () => void, delay: number = 500) {
  return window.setTimeout(() => {
    func()
  }, delay)
}

export default function useList(props: CommentPropsParams) {
  const {
    commentInfo,
    validateForm,
    disabledSubmit,
    tipTxt,
    tipIndex
  } = useForm()

  let timer: number

  const { proxy } = getCurrentInstance()!

  const visible = ref<boolean>(false)
  const isReply = ref<boolean>(false)
  const commentList = ref<CommentItem[]>([])
  // const curPage = ref<number>(1) /* 当前评论分页 (web 端处理) */

  const mentionsInfo = reactive<MentionsInfo>({
    toName: null,
    toEmail: null,
    parentId: null,
    topicId: null
  })

  const initMentions = () => {
      mentionsInfo.toName = null
      mentionsInfo.toEmail = null
      mentionsInfo.parentId = null
      mentionsInfo.topicId = null
  }

  function showModal(show: boolean) {
    visible.value = show
  }

  /**
   * 文章评论 / 回复他人评论按钮点击
   * @param {*} replyTag 是否是评论他人
   * @param {*} info? 评论对象
   * */
  function reply(replyTag: boolean, info?: CommentItem) {
    showModal(true)
    isReply.value = replyTag
    !replyTag && initMentions()
    if (!info) return
    // 拿取回复对象信息
    const { fromName, fromEmail, id, topicId } = info
    mentionsInfo.toName = fromName
    mentionsInfo.toEmail = fromEmail
    mentionsInfo.parentId = id
    mentionsInfo.topicId = topicId
  }

  /**
   * 获取当前文章评论列表
   * */
  function getComments() {
    if (props.articleId === -1) return

    proxy.$axios.get('/comment/list', {
      params: {articleId: props.articleId}
    }).then((res: any) => {
      if (res.success) {
        commentList.value = res.data
      }
    }).catch((err: any) => {
      errorNotify(err.message)
    })
  }

  /**
   * 新增评论文章或回复他人评论
   * */
  function addComment() {
    try {
      proxy.$axios.post('/comment/add', {
        toName: mentionsInfo.toName || null,
        toEmail: mentionsInfo.toEmail || null,
        topicId: mentionsInfo.topicId || null,
        parentId: mentionsInfo.parentId || null,
        comment: commentInfo.comment,
        fromName: commentInfo.name,
        fromEmail: commentInfo.email,
        /* @ts-ignore */
        articleId: vm.article.id,
        /* @ts-ignore */
        articleUid: vm.article.uid,
        /* @ts-ignore */
        articleTitle: vm.article.title
      }).then((res: any) => {
        if (!res.success) {
          warnNotify(res.message)
          return
        }
        successNotify(res.message)
        showModal(false)
        tipIndex.value = 7
      }).catch((err: any) => {
        errorNotify(err.message)
      })
    } catch (err) {
      errorNotify(err.message)
    }
  }

  onMounted(() => {
    getComments()
  })

  // comment modal submit button click
  function submit() {
    // 校验评论表单信息
    validateForm()
      .then((idx: any) => {
        tipIndex.value = idx // submitting...(idx === 5)

        addComment()

        nextTick(() => {
          tipIndex.value = 7
          if (timer) clearTimeout(timer)
          timer = waitForCalling(() => {
            /* 移除 tipTxt */
            tipIndex.value = -1
          }, 1000)
        })
      })
      .catch((idx: any) => {
        tipIndex.value = idx
      })
    // const { name, email, comment } = info
    // console.log(name, email, comment)
    // if (isReply.value) {
    //   emit('reply', { ...info, ...mentionsInfo })
    // } else {
    //   emit('reply', info)
    // }
  }

  return {
    commentInfo,
    disabledSubmit,
    tipTxt,
    tipIndex,
    AuthorInfo,
    mentionsInfo,
    visible,
    commentList,
    reply,
    submit
  }
}
