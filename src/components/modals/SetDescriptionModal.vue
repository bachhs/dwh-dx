<template>
    <div>
        <el-button text @click="centerDialogVisible = true"
            class="p-0">            
            <slot name="label">
                <div class="m-2 d-flex align-items-center">
                    <el-icon :size="20">
                        <Edit />
                    </el-icon>
                    <span class="ml-2">Edit</span>
                </div>
            </slot>
        </el-button>
        <el-dialog
            v-model="centerDialogVisible"
            title="Description"
            align-center>
            <template #title>
                <h5><strong>Cập nhật mô tả</strong></h5>
            </template>
            <div class="ckeditor-container">
                <ckeditor :editor="editorConfigs.editor" v-model="editorConfigs.editorData" :config="editorConfigs.editorConfig"></ckeditor>
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">
                    Bỏ qua
                </el-button>
                <el-button type="primary" @click="sumitData">
                    Lưu thay đổi
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
    import { ref, watch } from 'vue';    
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    const props = defineProps({
        modelValue: { type: String, required: false, default: '' }
    });
    const emit = defineEmits(['onFormSubmit', 'update:modelValue']);
    const centerDialogVisible = ref(false)
    const editorConfigs = ref({
        editor: ClassicEditor,
        editorData: props.modelValue,
        editorConfig: {
            // The configuration of the editor.
            //height: '200px'
        }
    });
    watch(() => props.modelValue, (newVal) =>{
        editorConfigs.value.editorData = newVal;
    });
    const sumitData = () =>{
        emit("update:modelValue", editorConfigs.value.editorData);
        emit("onFormSubmit", editorConfigs.value.editorData);
        centerDialogVisible.value = false
    };
</script>
