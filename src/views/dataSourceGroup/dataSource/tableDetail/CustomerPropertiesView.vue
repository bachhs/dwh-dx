<template>
    <el-scrollbar :style="`height: ${contentHeight};`">
        <div class="mr-3 pl-1 pt-2">
            <div class="flex-fill d-flex flex-column" :style="`height: ${contentNodataHeight};`">
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
const contentHeight = 'calc(100vh - 23rem)';
const contentNodataHeight = 'calc(100vh - 24rem)';
const contentNodataWithFilterHeight = 'calc(100vh - 28rem)';
</script>