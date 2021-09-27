import { reactive, ref, getCurrentInstance, computed, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { AuthorInfo, HAS_MORE, LOADING, M_RESET_LOAD_MORE, M_SET_LOAD_STATUS, NO_MORE } from '~/store/mutation-types'
import { CommentItem, MentionsInfo, CommentPropsParams } from '~/types'
import { errorNotify, successNotify, warnNotify, waitForCalling, commitMutations, DEFAULT_ERROR_TIP } from '~/utils'
import useForm from './useForm'

const PAGE_SIZE = 5

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
  // const loadStatus = ref<number>(0)

  /**
   * 分页展示的评论
   * */
  const showList = computed(() => {
    const showTotal = curPage.value * PAGE_SIZE
    return showTotal < commentList.value.length ? commentList.value.slice(0, showTotal) : commentList.value
  })

  function pagePlus() {
    commitMutations(vm.$store, M_SET_LOAD_STATUS, LOADING)
    if (timer) clearTimeout(timer)
    timer = waitForCalling(() => {
      curPage.value++
      if (showList.value.length < commentList.value.length) {
        commitMutations(vm.$store, M_SET_LOAD_STATUS, HAS_MORE)
      } else {
        commitMutations(vm.$store, M_SET_LOAD_STATUS, NO_MORE)
      }
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
  function replyComment(replyTag: boolean, info?: CommentItem) {
    showModal(true)
    isReply.value = replyTag
    !replyTag && initMentions()

    if (!info) {
      return
    }
    // 回复对象信息
    const { fromName, fromEmail, id, topicId, parentId } = info
    mentionsInfo.toName = fromName
    mentionsInfo.toEmail = fromEmail
    mentionsInfo.parentId = parentId === null ? id : parentId
    mentionsInfo.topicId = topicId
  }

  /**
   * 获取当前文章评论列表
   * */
  async function getComments() {
    if (!props.article.id) {
      commitMutations(vm.$store, M_SET_LOAD_STATUS, NO_MORE)
      return
    }

    try {
      const { success, data } = await vm.$axios.get('/comment/list', {
        params: { articleId: props.article.id }
      })
      if (success) {
        commentList.value = data
        curPage.value = 1
        // 还有更多
        if (data.length > curPage.value * PAGE_SIZE) {
          commitMutations(vm.$store, M_SET_LOAD_STATUS, HAS_MORE)
        } else {
          commitMutations(vm.$store, M_SET_LOAD_STATUS, NO_MORE)
        }
      }
    } catch (error: any) {
      errorNotify(error?.message ?? DEFAULT_ERROR_TIP)
    }
  }

  /**
   * 延迟 1s 关闭 modal
   * */
  function nextHideModal() {
    return new Promise(resolve => {
      if (timer) clearTimeout(timer)
      timer = waitForCalling(() => {
        tipIndex.value = 7
        showModal(false)
        getComments()
        clearCommentInfo()
        resolve(true)
        /* 移除 tipTxt */
        tipIndex.value = -1
      }, 1000)
    })
  }

  /**
   * 新增评论文章或回复他人评论
   * */
  async function addComment() {
    try {
      const { success, message } = vm.$axios.post('/comment/add', {
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
      })
      if (!success) {
        warnNotify(message)
        return
      }
      saveCommentUser()
      nextHideModal().then(() => {
        successNotify(message)
      })
    } catch (err: any) {
      tipIndex.value = 5
      errorNotify(err?.message ?? DEFAULT_ERROR_TIP)
    }
  }

  onMounted(() => {
    getComments()
  })

  onBeforeUnmount(() => {
    commitMutations(vm.$store, M_RESET_LOAD_MORE)
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
    replyComment,
    pagePlus,
    submit
  }
}
