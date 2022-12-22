<template>
    <div>
        <div>
            <strong>API method</strong><span class="ml-1 text-danger">*</span>
        </div>
        <div class="mt-2">
            <el-radio-group v-model="itemModel.apiMethod">
                <el-radio-button :label="`GET`" >GET</el-radio-button>
                <el-radio-button :label="`POST`" >POST</el-radio-button>
                <el-radio-button :label="`PUT`" >PUT</el-radio-button>
                <el-radio-button :label="`DELETE`">DELETE</el-radio-button
                >
            </el-radio-group>
        </div>
        <div class="mt-2">
            <strong>API URL</strong><span class="ml-1 text-danger">*</span>
        </div>
        <div class="mt-2">
            <el-input
                v-model="itemModel.apiUrl"
                size="large"
                placeholder="Dán URL API dữ liệu nguồn vào đây.." >
                <template #prepend>URL</template>
            </el-input>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    const props = defineProps({
        dataSourceItem: { type: Object, required: true },
    });
    const itemModel = ref<any>(props.dataSourceItem);
    watch(() => props.dataSourceItem, (newVal) =>{
        itemModel.value = newVal;
        console.log('dataSourceItem changed',newVal);
    });
</script>