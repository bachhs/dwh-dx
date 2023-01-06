<template>
    <div>
        <el-button text @click="centerDialogVisible = true"
            style="height: auto; line-height: inherit; font-size: inherit;"
            class="p-0 pb-1 pt-1">            
            <slot name="label">
                <el-tooltip content="Click xem chi tiết" placement="top">
                    <span class="line-clamp-1" v-html="content.replace(/<[^>]*>/g, '')"></span>
                </el-tooltip>
            </slot>
        </el-button>
        <el-dialog
            v-model="centerDialogVisible"
            title="Description"
            align-center>
            <template #title>
                <h5><strong>{{title}}</strong></h5>
            </template>
            <div v-html="content" style="white-space: normal !important; text-align: justify;">
                
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">
                    Đóng
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const props = defineProps({
        dotPrefix: { type: Boolean, required: false, default: false },
        title: { type: String, required: false, default: 'Chi tiết' },
        content: { type: String, required: false, default: '' }
    });
    const centerDialogVisible = ref(false);
</script>
