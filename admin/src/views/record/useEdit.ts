import {ref, reactive, UnwrapRef, toRaw, onMounted} from 'vue'
import {ValidateErrorEntity} from 'ant-design-vue/es/form/interface'
import {RecordInfo, ResponseData} from '../../types'
import {uploadCover, addRecord} from '../../api/api'
import {warningNotify, errorNotify, successNotify, parseLocationSearch} from '../../utils/util'

const rules = {
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

function isImage(file: File) {
    return file.type.match(/image/g)
}

export default function useEdit() {
    const formRef = ref()
    const recordInfo: UnwrapRef<RecordInfo> = reactive({
        title: '',
        tag: 'Mood',
        introduce: '',
        cover: '',
        music: '',
        content: ''
    })
    const tagOptions = ref<String[]>(['JS', 'Mood', 'Study Note', 'FrontEnd', 'BackEnd'])
    const uploading = ref<boolean>(false) // 上传文章 loading 状态
    const isUpdate = ref<boolean>(false) // 新增文章 / 更新文章
    const uploadCoverSwitch = ref<boolean>(false)
    const previewVisible = ref<boolean>(false)
    const previewImage = ref<string | undefined>('')

    onMounted(() => {
        const params = parseLocationSearch()
        console.log('get location search params: ', params)
    })

    const submit = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log('values', recordInfo, toRaw(recordInfo))
                handleUploadRecord()
            })
            .catch((error: ValidateErrorEntity<RecordInfo>) => {
                console.log('error', error)
            })
    }

    function handleUploadCover(files: FileList) {
        if (files.length < 1) return
        const file = files[0]
        if (!isImage(file)) {
            warningNotify('You should choose an image file')
            return
        }
        new Promise(resolve => {
            // 创建上传图片的数据对象
            const formData = new FormData()
            formData.append('cover', file)
            formData.append('filename', file.name)
            // @ts-ignore
            uploadCover(formData).then((res: ResponseData<any>) => {
                if (res.success) {
                    resolve(res.data.cover)
                } else {
                    warningNotify(res.message)
                }
            }).catch(err => {
                errorNotify(err.message)
            })
        }).then(cover => {
            if (typeof cover === 'string') {
                recordInfo.cover = cover
            }
        })
    }

    // 上传文章
    function handleUploadRecord() {
        if (isUpdate.value) {
            // 更新文章
            // updateRecord({})
            return
        }
        // 新增文章
        addRecord({
            title: recordInfo.title,
            tag: recordInfo.tag,
            introduce: recordInfo.introduce,
            content: recordInfo.content,
            music: recordInfo.music,
            cover: recordInfo.cover
        }).then((res: any) => {
            if (res.success) {
                successNotify(res.message)
            } else {
                warningNotify(res.message)
            }
        }).catch(err => {
            errorNotify(err.message)
        })
    }

    return {
        formRef,
        recordInfo,
        tagOptions,
        rules,
        previewVisible,
        previewImage,
        uploadCoverSwitch,
        uploading,
        submit,
        handleUploadCover
    }
}
