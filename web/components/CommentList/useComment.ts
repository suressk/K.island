
import { AuthorInfo } from '~/store/mutation-types'
import { ref } from '@nuxtjs/composition-api'
import { CommentInfo } from '~/types'


export default function useComment() {
  const visible = ref<boolean>(false)

  function showModal() {
    visible.value = true
  }
  // comment modal submit
  function getCommentInfo(info: CommentInfo) {
    const {name, email, comment} = info
    console.log(name, email, comment)
  }

  return {
    AuthorInfo,
    visible,
    showModal,
    getCommentInfo
  }
}
