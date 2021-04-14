// import {ref, reactive, toRaw, toRefs, UnwrapRef, onMounted} from 'vue'
// import {ValidateErrorEntity} from 'ant-design-vue/es/form/interface'
// import {RecordInfo, ResponseData, ArticleIds, RecordItem} from '../../types'
// import {uploadCover, addRecord, getRecordDetail, deleteCover} from '../../api/api'
// import {warningNotify, errorNotify, successNotify, parseLocationSearch} from '../../utils/util'

export const rules = {
    title: [
        {required: true, message: 'Input article title', trigger: 'blur'}
    ],
    introduce: [
        {required: true, message: 'Input article introduce', trigger: 'blur'}
    ],
    cover: [
        {required: true, message: 'Input cover link or upload an image', trigger: 'blur'}
    ],
    content: [
        {required: true, message: 'Input article content', trigger: 'blur'}
    ]
}

export function isImage(file: File) {
    return file.type.match(/image/g)
}

// export default function useEdit() {
//     const formRef = ref()
//     const recordInfo: UnwrapRef<RecordInfo> = reactive({
//         title: '',
//         tag: 'Mood',
//         introduce: '',
//         cover: '',
//         music: '',
//         content: ''
//     })
//     const tagOptions = ref<String[]>(['JS', 'Mood', 'Study Note', 'FrontEnd', 'BackEnd'])
//     const uploading = ref<boolean>(false) // 上传文章 loading 状态
//     const isUpdate = ref<boolean>(false) // 新增文章 / 更新文章
//     const uploadCoverSwitch = ref<boolean>(false)
//
//     const updateInfo = reactive({
//         id: -1,
//         uid: ''
//     })
//
//     onMounted(() => {
//         const params = parseLocationSearch()
//         // 文章列表跳转过来，编辑文章更新
//         if (Object.keys(params).length > 0) {
//             isUpdate.value = true
//             getRecordDetailInfo(params)
//         } else {
//             isUpdate.value = false
//         }
//     })
//
//     const submit = () => {
//         formRef.value
//             .validate()
//             .then(() => {
//                 console.log('values', recordInfo, toRaw(recordInfo))
//                 handleUploadRecord()
//             })
//             .catch((error: ValidateErrorEntity<RecordInfo>) => {
//                 console.log('error', error)
//             })
//     }
//
//     // 上传封面图
//     function handleUploadCover(files: FileList) {
//         if (files.length < 1) return
//         const file = files[0]
//         if (!isImage(file)) {
//             warningNotify('You should choose an image file')
//             return
//         }
//         new Promise(resolve => {
//             // 创建上传图片的数据对象
//             const formData = new FormData()
//             formData.append('cover', file)
//             formData.append('filename', file.name)
//             // @ts-ignore
//             uploadCover(formData).then((res: ResponseData<any>) => {
//                 if (res.success) {
//                     resolve(res.data.cover)
//                 } else {
//                     warningNotify(res.message)
//                 }
//             }).catch(err => {
//                 errorNotify(err.message)
//             })
//         }).then(cover => {
//             if (typeof cover === 'string') {
//                 recordInfo.cover = cover
//             }
//         })
//     }
//
//     // 删除封面图
//     function handleDeleteCover() {
//         const index = recordInfo.cover.indexOf('/images')
//         const relativePath = recordInfo.cover.substring(index) // server 根路径的相对路径
//         deleteCover({ relativePath })
//             .then((res: any) => {
//                 if (!res.success) {
//                     warningNotify(res.message)
//                     return
//                 }
//                 // 删除成功
//                 successNotify(res.message)
//                 recordInfo.cover = '' // 清空封面图
//             }).catch(err => {
//                 errorNotify(err.message)
//             })
//     }
//
//     // 查询文章详情信息
//     function getRecordDetailInfo(params: ArticleIds) {
//         getRecordDetail(params).then((res: any) => {
//             if (!res.success) {
//                 warningNotify(res.message)
//                 return
//             }
//             assignRecord(res.data)
//         }).catch(err => {
//             errorNotify(err.message)
//         })
//     }
//
//     // 文章内容赋值
//     function assignRecord(info: RecordItem) {
//         recordInfo.title = info.title
//         recordInfo.introduce = info.introduce
//         recordInfo.cover = info.cover
//         recordInfo.tag = info.tag
//         info.music && (recordInfo.music = info.music)
//         info.content && (recordInfo.content = info.content)
//
//         updateInfo.id = info.id
//         updateInfo.uid = info.uid
//     }
//
//     // 上传文章
//     function handleUploadRecord() {
//         if (isUpdate.value) {
//             // 更新文章
//             // updateRecord({})
//             return
//         }
//         // 新增文章
//         addRecord({
//             title: recordInfo.title,
//             tag: recordInfo.tag,
//             introduce: recordInfo.introduce,
//             content: recordInfo.content,
//             music: recordInfo.music,
//             cover: recordInfo.cover
//         }).then((res: any) => {
//             if (res.success) {
//                 successNotify(res.message)
//             } else {
//                 warningNotify(res.message)
//             }
//         }).catch(err => {
//             errorNotify(err.message)
//         })
//     }
//
//     return {
//         formRef,
//         recordInfo,
//         ...toRefs(recordInfo),
//         tagOptions,
//         rules,
//         uploadCoverSwitch,
//         uploading,
//         submit,
//         handleUploadCover,
//         handleDeleteCover
//     }
// }
