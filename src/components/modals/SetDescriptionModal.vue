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
            title="Warning"
            align-center>
            <div class="ckeditor-container">
                <ckeditor :editor="editorConfigs.editor" v-model="editorConfigs.editorData" :config="editorConfigs.editorConfig"></ckeditor>
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                    Confirm
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';    
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    const centerDialogVisible = ref(false)
    const editorConfigs = ref({
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
            // The configuration of the editor.
            //height: '200px'
        }
    });
</script>
