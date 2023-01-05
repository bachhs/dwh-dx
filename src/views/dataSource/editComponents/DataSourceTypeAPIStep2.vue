<template>
    <div>
        <!-- <div class="mt-2">
            <strong>CẤU HÌNH THAM SỐ API</strong><span class="ml-1 text-danger">*</span>
        </div> -->
        <div class="mt-3 d-flex">
            <div class="flex-fill">
                <el-input
                    class="input-with-select"
                    v-model="itemModel.apiUrl"
                    size="large"
                    placeholder="Dán URL API dữ liệu nguồn vào đây.." >
                    <template #prepend>
                        <el-select v-model="itemModel.apiMethod" size="large" style="width: 150px;">
                            <el-option v-for="item in restfulMethods" :key="item"
                                :label="item" :value="item" />
                        </el-select>
                    </template>
                </el-input>
            </div>
            <div></div>
        </div>
        <div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="Params" name="params">
                    <div>
                        <!-- <div class="mb-2">
                            <strong>Query params</strong><span class="ml-1 text-danger">*</span>
                        </div> -->
                        <div>
                            <el-form ref="ruleFormParamsRef" :model="itemModelAddParams" :rules="rules" 
                                label-width="0" class="ruleForm">
                                <table class="table table-hover table-striped table-borderless text-nowrap" >
                                    <thead>
                                        <tr style="background-color: #dceaff;">
                                            <th style="width: 50px;"></th>
                                            <th>KEY</th>
                                            <th>GIÁ TRỊ</th>
                                            <th>MÔ TẢ</th>
                                            <th style="width: 50px;"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="queryParam in queryParams" :key="queryParam.key">
                                            <td></td>
                                            <td>{{queryParam.key}}</td>
                                            <td>{{queryParam.value}}</td>
                                            <td>{{queryParam.description}}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <el-form-item label="" prop="key">
                                                    <el-input v-model="itemModelAddParams.key" placeholder="Key" size="large"/>
                                                </el-form-item>                                                
                                            </td>
                                            <td>
                                                <el-form-item label="" prop="value">
                                                    <el-input v-model="itemModelAddParams.value" placeholder="Giá trị" size="large"/>
                                                </el-form-item>                                                
                                            </td>
                                            <td>
                                                <el-form-item label="" prop="description">
                                                    <el-input v-model="itemModelAddParams.description" placeholder="Mô tả" size="large"/>
                                                </el-form-item>                                                
                                            </td>
                                            <td>
                                                <el-button size="large" type="primary" class="pl-3 pr-3"
                                                    @click="submitAddParam">
                                                    <i class="fas fa-check" style="font-size: 150%;"></i>
                                                </el-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </el-form>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Authorization" name="authorization">Authorization</el-tab-pane>
                <el-tab-pane label="Headers (12)" name="headers">Headers</el-tab-pane>
                <el-tab-pane label="Body" name="body">Body</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch, reactive } from 'vue';
    import { restfulMethods } from "@/helpers/constants";
    import type { FormInstance, FormRules } from 'element-plus';
    const props = defineProps({
        allowedEdit: { type: Boolean, required: false, default: true },
        dataSourceItem: { type: Object, required: true },
    });
    const itemModel = ref<any>(props.dataSourceItem);    
    const queryParams = ref<any>([]);
    const itemModelAddParams = ref<any>({ key: "", value: "", description: "" });
    watch(() => props.dataSourceItem, (newVal) =>{
        itemModel.value = newVal;
        console.log('dataSourceItem changed',newVal);
    });
    const activeName = ref('params');
    const ruleFormParamsRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
        key: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
        ],
        value: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
        ],
    });
    const submitAddParam = async () => {
        if (!ruleFormParamsRef || !ruleFormParamsRef.value) return;
        await ruleFormParamsRef.value.validate((valid, fields) => {
            if (valid) {
                queryParams.value.push({
                    ...itemModelAddParams.value
                });
                itemModelAddParams.value = { key: "", value: "", description: "" };
            } else {
                console.log('error submit!', fields);
            }
        });
    };
</script>

<style lang="scss" scoped>
    .input-with-select {
        .el-input-group__prepend {
            background-color: #fff;
            padding: 0;
        }
    }
</style>