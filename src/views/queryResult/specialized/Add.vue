<template>
    <div class="flex-fill d-flex flex-column w-100">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4>
                    <i class="fas fa-plus text-danger mr-2"></i>
                    <strong>Thêm mới không gian làm việc</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">                    
                <div class="ml-1">
                    <el-button size="large" type="primary">
                        Lưu dữ liệu
                    </el-button>

                    <el-button size="large" type="danger">
                        <el-icon :size="20" style="vertical-align: middle"
                            @click="$emit('changeView', { name: 'ListData' })">
                            <close />
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
            
        </div>   
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
defineEmits(['changeView'])
</script>