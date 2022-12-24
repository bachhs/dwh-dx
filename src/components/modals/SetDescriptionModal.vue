<template>
    <div>
        <el-button text @click="centerDialogVisible = true"
            class="p-0">            
            <slot name="label">
                <div class="m-2 d-flex align-items-center">
                    <el-icon :size="20">
                        <Edit />
                    </el-icon>
                    <span class="ml-2">Edit</span>
                </div>
            </slot>
        </el-button>
        <el-dialog
            v-model="centerDialogVisible"
            title="Warning"
            width="30%"
            align-center>
            <span>Open the dialog from the center from the screen</span>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                    Confirm
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const centerDialogVisible = ref(false)
</script>