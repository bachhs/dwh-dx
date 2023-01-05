<template>
    <div>
        <el-form
            v-if="itemModel"
            ref="ruleFormStep3Ref" :model="itemModel" :rules="rules" 
            label-width="0" class="ruleForm">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 mb-1">
                    <div>
                        <span style="font-size: 90%">IP address/ Host name</span>
                    </div>
                    <div class="mt-1">
                        <el-form-item label="" prop="host">
                            <el-input
                                v-model="itemModel.host"
                                size="large"
                                placeholder="IP address/ Host name"
                                clearable/>
                        </el-form-item>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 mb-1" >
                    <div>
                        <span style="font-size: 90%" >Port</span >
                    </div>
                    <div class="mt-1">
                        <el-form-item label="" prop="port">
                            <el-input
                                v-model="itemModel.port"
                                size="large"
                                placeholder="Port"
                                clearable />
                        </el-form-item>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 mb-1" >
                    <div>
                        <span style="font-size: 90%">DB name</span >
                    </div>
                    <div class="mt-1">
                        <el-form-item label="" prop="dbName">
                            <el-input
                                v-model="itemModel.dbName"
                                size="large"
                                placeholder="DB name"
                                clearable  />
                        </el-form-item>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 mb-1" >
                    <div>
                        <span style="font-size: 90%" >Username</span>
                    </div>
                    <div class="mt-1">
                        <el-form-item label="" prop="username">
                            <el-input
                                v-model="itemModel.username"
                                size="large"
                                placeholder="Username"
                                clearable />
                        </el-form-item>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 mb-1" >
                    <div>
                        <span style="font-size: 90%" >Password</span>
                    </div>
                    <div class="mt-1">
                        <el-form-item label="" prop="password">
                            <el-input
                                v-model="itemModel.password"
                                type="password"
                                size="large"
                                placeholder="Password"
                                clearable
                                show-password
                            />
                        </el-form-item>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
    import { ref, watch, reactive } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus';
    const props = defineProps({
        allowedEdit: { type: Boolean, required: false, default: true },
        dataSourceItem: { type: Object, required: true },
    });
    const itemModel = ref<any>(props.dataSourceItem);
    watch(() => props.dataSourceItem, (newVal) =>{
        itemModel.value = newVal;
    });

    const ruleFormStep3Ref = ref<FormInstance>();
    const rules = reactive<FormRules>({
        host: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
        ],
        port: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
        ],
        username: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
        ],
        password: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
        ],
        dbName: [
            {
                required: true,
                message: 'Vui lòng không bỏ trống..',
                trigger: 'blur',
            },
        ],
    });
    const emit = defineEmits(['onFormSubmit']);
    const submitData = async () => {
        if (!ruleFormStep3Ref || !ruleFormStep3Ref.value) return;
        await ruleFormStep3Ref.value.validate((valid, fields) => {
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