<template>
    <div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="0" status-icon>
            <div class="w-100 mb-2" v-if="isCategoryEdit">
                <div>
                    <span style="font-size: 90%" class="text-muted" >Chọn phân loại danh mục Tag <span class="text-danger">*</span></span >
                </div>
                <div class="mt-2">
                    <el-form-item label="" prop="category">
                        <el-select v-model="ruleForm.category" class="w-100" placeholder="Category type " size="large">
                            <el-option v-for="tagCatTypeItem in tagCategoryTypeItems" :key="tagCatTypeItem" :label="tagCatTypeItem" :value="tagCatTypeItem" />
                        </el-select>
                    </el-form-item>
                </div>
            </div>
            <div class="w-100 mb-4" >
                <div>
                    <span style="font-size: 90%" class="text-muted" >Tên Tag <span class="text-danger">*</span></span >
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
            <div class="w-100 mt-4 mb-2 description" >
                <div>
                    <span style="font-size: 90%" class="text-muted" >Mô tả Tag</span >
                </div>
                <div class="mt-2">
                    <el-form-item label="" prop="description">
                        <ckeditor :editor="editorConfigs.editor" v-model="ruleForm.description" :config="editorConfigs.editorConfig"></ckeditor>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <div class="mt-3 mb-3">
            <div class="text-right">
                <el-button @click="$emit('modalCloseTrigger')">Huỷ bỏ</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Lưu thông tin
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, watch, onMounted } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import { tagApi } from "@/api/tagApi";
    const emit = defineEmits(['modalCloseTrigger', 'submit'])
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
    const ruleForm = ref({
        name: '',
        category: 'Descriptive',
        description: '',
    });
    const rules = reactive<FormRules>({
        name: [
            { required: true, message: 'Tên ko được để trống', trigger: 'blur' },
            { min: 2, message: 'Vui lòng nhập trường này 2 ký tự trở lên', trigger: 'blur' },
        ],
    });

    const tagCategoryTypeItems = ref<Array<string>>([]);
    const getTagCategoryType = () => {
        tagApi.tagCategoryTypeList().then((response:any) =>{
            tagCategoryTypeItems.value = response.data;
        });
    };

    const resetForm = () => {        
        ruleForm.value = {
            name: '',
            category: 'Descriptive',
            description: '',
        };
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid) => {
            if (valid) {
                emit('submit', ruleForm.value);
            }
        })
    }

    const loadTagCategoryType = () => {
        if(props.isCategoryEdit) getTagCategoryType();
    };

    onMounted(() => {
        loadTagCategoryType();
    });

    defineExpose({
        resetForm,
        loadTagCategoryType,
    });
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