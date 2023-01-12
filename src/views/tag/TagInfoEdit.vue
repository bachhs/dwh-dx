<template>
    <div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="0" status-icon>
            <div class="w-100 mb-2" v-if="isCategoryEdit">
                <div>
                    <span style="font-size: 90%" class="text-muted" >Select Category Type <span class="text-danger">*</span></span >
                </div>
                <div class="mt-2">
                    <el-form-item label="" prop="category">
                        <el-select v-model="ruleForm.category" class="w-100" placeholder="Category type " size="large">
                            <el-option label="Descriptive" value="Descriptive" />
                            <el-option label="Classification" value="Classification" />
                        </el-select>
                    </el-form-item>
                </div>
            </div>
            <div class="w-100 mb-2" >
                <div>
                    <span style="font-size: 90%" class="text-muted" >Tag name <span class="text-danger">*</span></span >
                </div>
                <div class="mt-2">
                    <el-form-item label="" prop="name">
                        <el-input
                            v-model="ruleForm.name"
                            size="large"
                            placeholder="name"
                            clearable />
                    </el-form-item>
                </div>
            </div>
            <div class="w-100 mb-2 description" >
                <div>
                    <span style="font-size: 90%" class="text-muted" >Tag description</span >
                </div>
                <div class="mt-2">
                    <el-form-item label="" prop="description">
                        <ckeditor :editor="editorConfigs.editor" v-model="ruleForm.description" :config="editorConfigs.editorConfig"></ckeditor>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, watch } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    const props = defineProps({
        modelValue: { type: Object, required: false, default: { name: '', description: '', category: 'Descriptive' } },
        isCategoryEdit: { type: Boolean, required: false, default: true }
    });
    const editorConfigs = ref({
        editor: ClassicEditor,
        editorConfig: {
            // The configuration of the editor.
            //height: '300px'
        }
    });
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
        name: '',
        category: 'Descriptive',
        description: '',
    });
    const rules = reactive<FormRules>({
        name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
    });

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('submit!')
            } else {
                console.log('error submit!', fields)
            }
        })
    }
</script>

<style lang="scss">
    .description{
        .ck-content{
            &.ck-editor__editable{
                padding-top: 0.5rem;
                height: 150px !important;
                p{
                    line-height: 1.3rem;
                    margin-top: 0;
                    margin-bottom: 0;
                }
            }
        }
    }
</style>