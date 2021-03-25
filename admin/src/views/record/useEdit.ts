import { ref, reactive, UnwrapRef, toRaw } from 'vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { RecordInfo, ResponseData } from '../../types'
import {uploadCover} from '../../api/api'
import {warningNotify, errorNotify} from '../../utils/util'

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

function isImage(file: File) {
    return file.type.match(/image/g)
}

export default function useEdit () {
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

    function handleUploadCover (files: FileList) {
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

    // 测试图片
    // 'https://th.bing.com/th/id/R65398d6ad86129f9628c0ad80da4040c?rik=C3qNS9mZOQk%2b5A&riu=http%3a%2f%2fwww.shijuepi.com%2fuploads%2fallimg%2f200918%2f1-20091Q10420.jpg&ehk=QBNuJIbVP1qo%2bwUD3YzXcvL4H5iHivOHXUnzzRw%2bWfU%3d&risl=&pid=ImgRaw'

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
        uploadCoverSwitch
    }
}
