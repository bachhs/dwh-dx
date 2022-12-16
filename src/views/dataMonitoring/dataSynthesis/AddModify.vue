<script lang="ts" setup>
    import { ref, defineProps } from "vue";
    import { mapState } from "pinia";
    import { useDataCategoryStore } from '@/stores/dataCategory';
    export interface ViewSettingsProps {
        viewName: string,
        title: string,
        dataItem: any,
    }
    const isLoading = ref(false);
    const viewSettings = defineProps<ViewSettingsProps>()
</script>
<template>
    <div class="flex-fill d-flex flex-column w-100"
        v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4 class="mb-0">
                    <i class="fas fa-database text-lightblue mr-2"></i>
                    <strong>{{viewSettings.title}}</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">                
                <div class="ml-1 mr-4">                    
                    <el-button size="default" type="primary">
                        <el-icon><CircleCheck /></el-icon>
                        <span>Lưu dữ liệu</span>
                    </el-button>
                    <el-button size="default" type="danger"
                        @click="$emit('onChangeView', { viewName: 'ListData', data: null })">
                        <div>
                            Thoát
                        </div>
                    </el-button>
                </div>
            </div>
        </div>
        <el-scrollbar class="d-flex flex-fill mt-3 pr-0">
            
        </el-scrollbar>
    </div>
</template>
 
<style scoped lang="scss">
 
</style>