<script lang="ts" setup>
    const props = defineProps({
        dataSourceItem: { type: Object, required: true },
    });
    const itemModel = props.dataSourceItem;
</script>
<template>
    <div>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <div>
                    <span style="font-size: 90%">IP address/ Host name</span>
                </div>
                <div class="mt-1">
                    <el-input
                        v-model="itemModel.host"
                        size="large"
                        placeholder="IP address/ Host name"
                        clearable/>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2" >
                <div>
                    <span style="font-size: 90%" >Port</span >
                </div>
                <div class="mt-1">
                    <el-input
                        v-model="itemModel.port"
                        size="large"
                        placeholder="Port"
                        clearable />
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2" >
                <div>
                    <span style="font-size: 90%" >Username</span>
                </div>
                <div class="mt-1">
                    <el-input
                        v-model="itemModel.username"
                        size="large"
                        placeholder="Username"
                        clearable />
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2" >
                <div>
                    <span style="font-size: 90%" >Password</span>
                </div>
                <div class="mt-1">
                    <el-input
                        v-model="itemModel.password"
                        type="password"
                        size="large"
                        placeholder="Password"
                        clearable
                        show-password
                    />
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2" >
                <div>
                    <span style="font-size: 90%">DB name</span >
                </div>
                <div class="mt-1">
                    <el-input
                        v-model="itemModel.dbName"
                        size="large"
                        placeholder="DB name"
                        clearable />
                </div>
            </div>
        </div>
    </div>
</template>