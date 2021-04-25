import { reactive, ref, getCurrentInstance, computed, nextTick, onMounted } from '@nuxtjs/composition-api'
import { AuthorInfo, LOAD_MORE, LOADING, NO_MORE } from '~/store/mutation-types'
import { CommentItem, MentionsInfo, CommentPropsParams } from '~/types'
import { errorNotify, successNotify, warnNotify, waitForCalling } from '~/utils/util'
import useForm from './useForm'

export default function useList(props: CommentPropsParams) {
  const {
    commentInfo,
    showVerify,
    disabledSubmit,
    tipContent,
    tipIndex,
    tipClass,
    submitting,
    validateForm,
    getCommentUser,
    saveCommentUser,
    clearCommentInfo
  } = useForm()

  let timer: number

  const { proxy: vm } = getCurrentInstance()!

  const isReply = ref<boolean>(false)
  const commentList = ref<CommentItem[]>([]) /* 所有评论列表 */

  const commentNum = computed<number>(() => commentList.value.length)

  const visible = ref<boolean>(false)
  const mentionsInfo = reactive<MentionsInfo>({
    toName: null,
    toEmail: null,
    parentId: null,
    topicId: null
  })
  /* 当前评论分页 (web 端处理) */
  const curPage = ref<number>(1)
  const size = 5 /* 分页，每页显示数 */
  const loadStatus = ref<number>(0)

  /**
   * 分页展示的评论
   * */
  const showList = computed(() => {
    const showTotal = curPage.value * size
    return showTotal < commentList.value.length ? commentList.value.slice(0, showTotal) : commentList.value
  })

  function pagePlus() {
    loadStatus.value = LOADING
    if (timer) clearTimeout(timer)
    timer = waitForCalling(() => {
      curPage.value ++
      loadStatus.value = showList.value.length < commentList.value.length ? LOAD_MORE : NO_MORE
    }, 1000)
  }

  /**
   * 初始化（置空）回复对象信息
   * */
  const initMentions = () => {
    mentionsInfo.toName = null
    mentionsInfo.toEmail = null
    mentionsInfo.parentId = null
    mentionsInfo.topicId = null
  }

  /**
   * 评论弹框显隐
   * */
  function showModal(show: boolean) {
    visible.value = show
    show && getCommentUser()
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
    const { fromName, fromEmail, id, topicId, parentId } = info
    mentionsInfo.toName = fromName
    mentionsInfo.toEmail = fromEmail
    mentionsInfo.parentId = parentId === null ? id : parentId
    mentionsInfo.topicId = topicId
  }

  /**
   * 获取当前文章评论列表
   * */
  function getComments() {
    if (!props.article.id) {
      loadStatus.value = NO_MORE
      return
    }

    vm.$axios.get('/comment/list', {
      params: { articleId: props.article.id }
    }).then((res: any) => {
      if (res.success) {
        commentList.value = res.data
        curPage.value = 1
        loadStatus.value = res.data.length > curPage.value * size ? LOAD_MORE : NO_MORE
      }
    }).catch((err: any) => {
      errorNotify(err.message)
    })
  }

  /**
   * 延迟 1s 关闭 modal
   * */
  function nextHideModal() {
    nextTick(() => {
      if (timer) clearTimeout(timer)
      timer = waitForCalling(() => {
        tipIndex.value = 7
        showModal(false)
        getComments()
        clearCommentInfo()
        /* 移除 tipTxt */
        tipIndex.value = -1
      }, 1000)
    })
  }

  /**
   * 新增评论文章或回复他人评论
   * */
  function addComment() {
    try {
      vm.$axios.post('/comment/add', {
        toName: mentionsInfo.toName,
        toEmail: mentionsInfo.toEmail,
        topicId: mentionsInfo.topicId,
        parentId: mentionsInfo.parentId,
        comment: commentInfo.comment,
        fromName: commentInfo.name,
        fromEmail: commentInfo.email,
        articleId: props.article.id,
        articleUid: props.article.uid,
        articleTitle: props.article.title
      }).then((res: any) => {
        if (!res.success) {
          warnNotify(res.message)
          return
        }
        saveCommentUser()
        nextHideModal()
        successNotify(res.message)
      }).catch((err: any) => {
        tipIndex.value = 5
        errorNotify(err.message)
      })
    } catch (err) {
      tipIndex.value = 5
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
        tipIndex.value = idx // submitting...(idx === 6)

        addComment()

      })
      .catch((idx: any) => {
        tipIndex.value = idx
      })
  }

  return {
    commentInfo,
    showVerify,
    disabledSubmit,
    tipContent,
    tipIndex,
    tipClass,
    submitting,
    AuthorInfo,
    commentNum,
    mentionsInfo,
    visible,
    showList,
    loadStatus,
    pagePlus,
    reply,
    submit
  }
}
