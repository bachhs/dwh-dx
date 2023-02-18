<script lang="ts" src="@/scripts/enrichData/column-detail/index.ts"></script>
<template>
    <el-card
        class="box-card w-100 d-flex flex-fill flex-column"
        :body-style="{ padding: '0.8rem 1rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center">
                <div class="flex-fill d-none d-md-block">
                    <h4>
                        <i class="fas fa-info-circle text-danger mr-2"></i>
                        <strong>Chi tiết cột</strong>
                    </h4>
                </div>
                <div class="d-flex align-items-center">                    
                    <div class="ml-1">
                        <el-button size="large" type="primary">
                            <el-icon :size="20" style="vertical-align: middle">
                                <Plus />
                            </el-icon>
                        </el-button>

                        <el-button size="large" type="primary">
                            <el-icon :size="20" style="vertical-align: middle">
                                <Refresh />
                            </el-icon>
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
                <el-scrollbar class="w-100 flex-fill">
                    <div class="mt-2 mr-3">
                        
                    </div>
                </el-scrollbar>  
            </div>
        </div>
    </el-card>
</template>
