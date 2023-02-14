<script lang="ts" src="@/scripts/digitization/index.ts"></script>
<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.5rem 0.8rem' }">
        <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
            <div class="d-flex align-items-center pr-3">
                <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                    <h4>
                        <i class="fas fa-search text-lightblue mr-2"></i>
                        <strong>Số hoá dữ liệu</strong>
                    </h4>
                </div>
                <div class="d-flex align-items-center">
                    
                </div>
            </div>
            <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
                <div class="flex-fill d-flex flex-column">
                    <el-scrollbar class="w-100 flex-fill">
                        <div class="mt-2 mr-3">
                            
                        </div>
                    </el-scrollbar>
                    <div class="mt-1 d-flex align-items-center pr-2 p-1">
                        <div class="flex-fill pl-2 d-flex align-items-center">
                            <div class="d-none d-md-block">
                                
                            </div>
                        </div>
                        <div>
                            <!-- <el-pagination small background layout="prev, pager, next" :total="50" class="mt-1" /> -->
                        </div>
                    </div>
                </div> 
            </div>
        </div>

    </el-card>
</template>