
// export interface GetCommentListParams {
//     id: number
//     uid: string
// }

export interface AddCommentParams {
    articleId: number /* 文章 id */
    parentId: number | null /* 评论对象 这条评论记录的 id */
    comment: string /* 评论内容 */
    fromName: string /* 当前评论者 nickname */
    fromEmail: string /* 当前评论者 email */
    topicId: string /* 话题 id => 分组标识 */
    toName?: string /* TODO 评论对象的 name （待定） */
    toEmail?: string /* TODO 评论对象的 email （待定） */
}
