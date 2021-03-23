import { ref, reactive, UnwrapRef, toRaw } from 'vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { RecordInfo, ResponseData } from '../../types'
import {uploadCover} from '../../api/api'
// import { notification } from 'ant-design-vue'

const rules = {
    title: [
        { required: true, message: 'Input article title', trigger: 'blur' }
    ],
    introduce: [
        { required: true, message: 'Input article introduce', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: 'Input cover link or upload an image', trigger: 'blur' }
    ],
    music: [
        { required: true, message: 'Input music link', trigger: 'blur' }
    ],
    content: [
        { required: true, message: 'Input article content', trigger: 'blur' }
    ]
}

interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    percent?: number;
    url?: string;
    preview?: string;
    originFileObj?: any;
}

interface FileInfo {
    file: File
    fileList: FileItem[]
}

export default function useEditRecord () {
    const formRef = ref();
    const recordInfo: UnwrapRef<RecordInfo> = reactive({
        title: '',
        tag: 'Mood',
        introduce: '',
        cover: '',
        music: '',
        musicName: '',
        content: ''
    })
    const tagOptions = ref<String[]>(['JS', 'Mood', 'Study Note', 'FrontEnd', 'BackEnd'])

    const uploadCoverSwitch = ref<boolean>(false)
    const previewVisible = ref<boolean>(false)
    const previewImage = ref<string | undefined>('')
    const fileList = ref<FileItem[]>([])
    const submit = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log('values', recordInfo, toRaw(recordInfo))
            })
            .catch((error: ValidateErrorEntity<RecordInfo>) => {
                console.log('error', error)
            })
    }

    const handlePreview = () => {

    }

    function cancelPreview () {
        previewVisible.value = false
    }

    function handleUploadCover (info: FileInfo) {
        const { file } = info
        if (!file.type.match(/image/g)) {

            return
        }
        new Promise(resolve => {
            // 创建上传图片的数据对象
            const formData = new FormData()
            formData.append('cover', file)
            formData.append('filename', file.name)
            // @ts-ignore
            uploadCover(formData).then((res: PromiseLike<ResponseData<any>>) => {
                // @ts-ignore
                if (res.success) {
                    // notification({
                    //
                    // })
                    // @ts-ignore
                    resolve(res.data.cover)
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        }).then(cover => {
            if (typeof cover === 'string') {
                // previewCoverUrl.value = urlStr
                recordInfo.cover = cover
            }
        })
    }

    return {
        formRef,
        recordInfo,
        tagOptions,
        rules,
        submit,
        handleUploadCover,
        previewVisible,
        previewImage,
        fileList,
        handlePreview,
        cancelPreview,
        uploadCoverSwitch
    }
}
