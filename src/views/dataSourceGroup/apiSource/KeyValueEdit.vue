<template>
    <div>
        <el-form ref="ruleFormParamsRef" :model="itemModelAddParams" :rules="rulesParams" 
            label-width="0" class="ruleForm">
            <table class="table table-striped table-borderless text-nowrap" >
                <thead>
                    <tr style="background-color: #ebebeb;">
                        <!-- <th style="width: 50px;"></th> -->
                        <th>KEY</th>
                        <th>GIÁ TRỊ</th>
                        <!-- <th>MÔ TẢ</th> -->
                        <th class="text-center" style="width: 50px;">
                            <!-- <el-tooltip class="box-item" effect="dark" content="Chế độ chỉnh sửa Bulk" placement="bottom">
                                <el-switch v-model="editMode" />
                            </el-tooltip> -->
                        </th>
                    </tr>
                </thead>
                <tbody v-if="queryParams && queryParams.length > 0">                    
                    <tr v-for="queryParam in queryParams" :key="queryParam.key">
                        <!-- <td></td> -->
                        <td><el-input :value="queryParam.key" disabled placeholder="Key" size="large"/></td>
                        <td><el-input :value="queryParam.value" disabled placeholder="Key" size="large"/></td>
                        <!-- <td><el-input :value="queryParam.description" disabled placeholder="Key" size="large"/></td> -->
                        <td>
                            <!-- <el-button type="default" class="p-2">
                                <el-icon
                                    style="vertical-align: middle"
                                    :size="20">
                                    <Edit />
                                </el-icon>
                            </el-button> -->
                            <el-button type="danger" class="p-2"
                                @click="deleteItem(queryParam.key)">
                                <el-icon
                                    style="vertical-align: middle"
                                    :size="20">
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!editMode">
                    <tr>
                        <!-- <td></td> -->
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
                        <!-- <td>
                            <el-form-item label="" prop="description">
                                <el-input v-model="itemModelAddParams.description" placeholder="Mô tả" size="large"/>
                            </el-form-item>                                                
                        </td> -->
                        <td>
                            <el-button size="large" type="primary" class="pl-3 pr-3"
                                @click="submitAddParam">
                                <i class="fas fa-check" style="font-size: 150%;"></i>
                            </el-button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="4">
                            <el-input v-model="itemModelParamsBulk"
                                :autosize="{ minRows: 6, maxRows: 20 }"
                                type="textarea"
                                size="large" placeholder="Mỗi dòng là 1 tham số&#10;Tên tham số được phân chia bởi dấu :&#10;Ví dụ: name : value"
                                clearable />
                        </td>
                    </tr>
                </tbody>
            </table>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
const props = defineProps({
    queryParamsModel: { type: Array<any>, required: false, default: true },
});
watch(() => props.queryParamsModel, (newVal) =>{
    queryParams.value = newVal;
});
const queryParams = ref<Array<any>>([]);
const editMode = ref<any>(false);
const itemModelParamsBulk = ref<any>("");
const itemModelAddParams = ref<any>({ key: "", value: "", description: "" });
const ruleFormParamsRef = ref<FormInstance>();

const regexValidKey = new RegExp('^([a-zA-Z0-9]+)$');
const checkKeyValue = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Vui lòng không bỏ trống..'))
    }
    if (!regexValidKey.test(value)) {
        callback(new Error('Tên tham số không hợp lệ..'))
    } else {            
        callback()
    }
};

const rulesParams = reactive<FormRules>({
    key: [
        {
            validator: checkKeyValue,
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

watch(() => queryParams.value, (newValue) =>{
    let paramsStrList = newValue.map((xItem:any) => {
        return `${xItem.key}:${xItem.value}`;
    });
    itemModelParamsBulk.value = paramsStrList.join('\r\n');
});

onMounted(() =>{
    queryParams.value = props.queryParamsModel;
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

const deleteItem = (key:string) =>{
    ElMessageBox.confirm(
        'Dữ liệu được chọn sẽ bị xoá. Tiếp tục ?',
        'Xác nhận xoá', {
            confirmButtonText: 'Tiếp tục',
            cancelButtonText: 'Không xoá',
            type: 'warning',
        })
        .then(() => {            
            if(queryParams.value && queryParams.value.length > 0){
                let findIndex = queryParams.value.findIndex((xItem:any) => xItem.key === key);
                if(findIndex > -1){
                    queryParams.value.splice(findIndex, 1);
                }
            }
        }).catch(() => { });
};

const emit = defineEmits(['onFormParamsSubmit']);
const submitData = async () => {
    emit("onFormParamsSubmit", queryParams.value);
};
defineExpose({
    submitData,
});
</script>