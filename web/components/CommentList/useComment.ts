import { AuthorInfo } from '~/store/mutation-types'
import { reactive, ref, SetupContext } from '@nuxtjs/composition-api'
import { CommentItem, CommentInfo } from '~/types'

type CommentPropsParams = {
  commentList: CommentItem[]
}

export default function useComment(props: CommentPropsParams, { emit }: SetupContext) {
  const visible = ref<boolean>(false)
  const isReply = ref<boolean>(false)

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

  // comment modal submit
  function getCommentInfo(info: CommentInfo) {
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
    getCommentInfo
  }
}
