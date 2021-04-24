import { reactive, ref, getCurrentInstance, SetupContext, onMounted } from '@nuxtjs/composition-api'
import { AuthorInfo } from '~/store/mutation-types'
import { CommentItem, CommentInfo } from '~/types'
import { errorNotify } from '~/utils/util'

type CommentPropsParams = {
  commentList: CommentItem[]
  articleId: number
}

export default function useList(props: CommentPropsParams, { emit }: SetupContext) {
  const { proxy } = getCurrentInstance()!

  const visible = ref<boolean>(false)
  const isReply = ref<boolean>(false)
  const comments = ref<CommentItem[]>([])
  const curPage = ref<number>(1) /* 当前评论分页 */

  const mentionsInfo = reactive({
    toName: '',
    toEmail: '',
    parentId: -1,
    topicId: ''
  })

  const initMentions = () => {
      mentionsInfo.toName = ''
      mentionsInfo.toEmail = ''
      mentionsInfo.parentId = -1
      mentionsInfo.topicId = ''
  }

  function showModal() {
    visible.value = true
  }

  function reply(reply: boolean, info?: CommentItem) {
    showModal()
    isReply.value = reply
    !reply && initMentions()
    if (!info) return
    // 拿取回复对象信息
    const { fromName, fromEmail, id, topicId } = info
    mentionsInfo.toName = fromName
    mentionsInfo.toEmail = fromEmail
    mentionsInfo.parentId = id
    mentionsInfo.topicId = topicId
  }

  function getComments() {
    if (props.articleId === -1) return

    proxy.$axios.get('/comment/list', {
      params: {articleId: props.articleId}
    }).then((res: any) => {
      if (res.success) {
        comments.value = res.data
      }
    }).catch((err: any) => {
      errorNotify(err.message)
    })
  }

  onMounted(() => {
    getComments()
  })

  // comment modal submit
  function submitComment(info: CommentInfo) {
    const { name, email, comment } = info
    console.log(name, email, comment)
    if (isReply.value) {
      emit('reply', { ...info, ...mentionsInfo })
    } else {
      emit('reply', info)
    }
  }

  return {
    AuthorInfo,
    mentionsInfo,
    visible,
    reply,
    submitComment
  }
}
