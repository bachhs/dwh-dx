<template>
    <el-form
        ref="ruleFormStep1Ref" :model="itemModel" :rules="rules" 
        label-width="0" class="ruleForm" status-icon >
        <div class="mb-3">
            <div>
                <strong>Tên nguồn dữ liệu</strong
                ><span class="ml-1 text-danger">*</span>
            </div>
            <div class="mt-2">
                <el-form-item label="" prop="nameOfDS">
                    <el-input
                        v-model="itemModel.nameOfDS"
                        size="large"
                        placeholder="Tên nguồn dữ liệu"
                        clearable
                    />
                </el-form-item>
            </div>
            <div class="mt-4">
                <strong>Mô tả nguồn dữ liệu</strong
                ><span class="ml-1 text-danger">*</span>
            </div>
            <div class="mt-2">
                <el-form-item label="" prop="descOfDS">
                    <el-input
                        v-model="itemModel.descOfDS"
                        size="large"
                        :autosize="{ minRows: 2, maxRows: 4, }"
                        type="textarea"
                        placeholder="Mô tả nguồn dữ liệu"
                        clearable />
                </el-form-item>
            </div>
        </div>
        <div class="mt-4">
            <div>
                <strong>Đơn vị cung cấp</strong><span class="ml-1 text-danger">*</span>
            </div>
            <div class="row mt-2">
                <div
                    class="col-12 col-md-3 organization-item"
                    v-for="item in organization"
                    :key="item.id">
                    <label class="d-block">
                        <input
                            type="radio"
                            class="radio-selection"
                            :value="item.id"
                            v-model=" itemModel.organizationSelected " />
                        <el-card
                            :body-style="{ padding: '1rem 0.8rem', }" 
                            style=" height: auto; overflow: hidden; "
                            class="mb-3" >
                            <div class="position-relative d-flex align-items-center" >
                                <div
                                    class="flex-fill item--name text-nowrap"
                                    style=" overflow-x: hidden; " >
                                    {{ item.name }}
                                </div>
                                <div class="ml-1 organization-item--icon-selected d-none" >
                                    <el-icon :size="20" color="white" ><Check/></el-icon>
                                </div>
                            </div>
                        </el-card>
                    </label>
                </div>
            </div>
        </div>
    </el-form>
</template>
<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus';
    const props = defineProps({
        dataSourceItem: { type: Object, required: true },
        organization: { type: Array<any>, required: true }
    });
    const itemModel = props.dataSourceItem;
    const ruleFormStep1Ref = ref<FormInstance>();
    const rules = reactive<FormRules>({
        nameOfDS: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
            {
                min: 3,
                message: 'Nhập tối thiểu 3 ký tự..',
                trigger: 'blur',
            },
        ],
        descOfDS: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
            {
                min: 3,
                message: 'Nhập tối thiểu 3 ký tự..',
                trigger: 'blur',
            },
        ],
    });
    const emit = defineEmits(['onFormSubmit']);
    const submitData = async () => {
        console.log('submitData', ruleFormStep1Ref);
        if (!ruleFormStep1Ref || !ruleFormStep1Ref.value) return;
        await ruleFormStep1Ref.value.validate((valid, fields) => {
            if (valid) {
                emit("onFormSubmit", valid);
            } else {
                console.log('error submit!', fields);
            }
        });
    };
    defineExpose({
        submitData,
    });
</script>
<style lang="scss" scoped>
.radio-selection {
    visibility: hidden;
    display: none;
}

.organization-item {
    label {
        cursor: pointer;
    }

    .radio-selection {
        &:checked + .el-card {
            background-color: #5ca6e5;
            color: #fff;

            .item--name {
                font-weight: 600;
            }

            .organization-item--icon-selected {
                display: block !important;
            }
        }
    }
}
</style>