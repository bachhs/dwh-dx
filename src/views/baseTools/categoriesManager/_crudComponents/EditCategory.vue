<template>
    <div class="mb-4" v-for="editField in editFields" :key="editField.key">
        <div>
            <strong>{{ editField.label }}</strong
            ><span class="ml-1 text-danger">*</span>
        </div>
        <div class="mt-2">
            <el-form-item label="" :prop="editField.key">
                <el-input
                    v-model="itemModel[editField.key]"
                    size="large"
                    :placeholder="`${editField.label}..`" />
            </el-form-item>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
    editFields: { type: Array<any>, required: true, default: null },
    itemModel: { type: Object, required: true, default: null }, 
});
</script>
