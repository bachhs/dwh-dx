<template>
    <div>
        <el-button text @click="centerDialogVisible = true"
            style="height: auto;"
            class="p-0">            
            <slot name="label">
                <div class="m-1 d-flex align-items-center">                    
                    <span class="ml-2 text-primary"><span v-if="dotPrefix">...</span> Xem thêm</span>
                </div>
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
