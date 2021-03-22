import { ref, reactive, toRefs } from 'vue'
import { RecordInfo } from '../../@types'

const tagOptions = [
    { label: 'Js', value: 'JS' },
    { label: 'Mood', value: 'MOOD' },
    { label: 'Js', value: 'JS' },
    { label: 'Js', value: 'JS' },
    { label: 'Js', value: 'JS' },
]

export default function useNewRecord () {
    const recordInfo = reactive<RecordInfo>({
        title: '',
        tag: '',
        introduce: '',
        cover: '',
        music: '',
        musicName: '',
        content: ''
    })
    const tagOptions = ref<String[]>(['JS', 'Mood', 'Study Note', 'FrontEnd', 'BackEnd'])

    return {
        ...toRefs(recordInfo),
        tagOptions
    }
}
