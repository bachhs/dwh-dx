<template>    
    <el-scrollbar :style="`height: ${contentHeight};`">
        <div class="mb-3">
            <el-radio-group v-model="activityFilter">
                <el-radio-button label="All Activity" />
                <el-radio-button label="Mentions" />
            </el-radio-group>
        </div>
        <div class="mr-3 pl-1 pt-2">
            <div
                class="flex-fill d-flex flex-column"
                :style="`height: ${contentNodataWithFilterHeight};`">
                <no-data />
            </div>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const props = defineProps({
    viewSettings: { type: Object, required: true },
});
const activityFilter = ref('All Activity');
const contentHeight = 'calc(100vh - 23rem)';
const contentNodataHeight = 'calc(100vh - 24rem)';
const contentNodataWithFilterHeight = 'calc(100vh - 28rem)';
</script>