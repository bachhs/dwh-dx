<script lang="ts" src="@/scripts/datasourcePipeline/datasourcePipeline/addModify.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100"
        v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4 class="mb-0">
                    <i class="fas fa-plus text-lightblue mr-2"></i>
                    <strong>{{viewSettings.title}}</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">                
                
            </div>
        </div>
        <el-scrollbar class="d-flex flex-fill mt-3 pr-2">
            <div class="w-100 mr-2">
                <el-form ref="ruleFormRef" :model="itemModel" :rules="rules"
                    label-width="0" class="ruleForm" status-icon >       
                    <el-card>
                        <div class="mt-0">
                            <div class="row">
                                <div class="col-12 col-md-3 organization-item radio-custom-item"
                                    v-for="item in organization" :key="item.id">
                                    <label  class="d-block">
                                        <input type="radio" class="radio-selection" 
                                            :value="item.id" v-model="organizationSelected"/>
                                        <el-card :body-style="{ padding: '1rem 0.8rem' }"
                                                style="height: auto; overflow: hidden;"
                                                class="mb-3">
                                            <div class="position-relative d-flex align-items-center">
                                                <div class="flex-fill item--name text-nowrap" style="overflow-x: hidden;">
                                                    {{item.name}}
                                                </div>
                                                <div class="ml-1 organization-item--icon-selected d-none">                                        
                                                    <el-icon :size="20" color="white"><Check /></el-icon>
                                                </div>
                                            </div>                                            
                                        </el-card>
                                    </label>
                                </div>
                            </div>
                        </div>    
                    </el-card>              
                    <el-card class="mt-3">
                        <div class="mb-1">
                            <div class="mt-0"><strong>Dữ liệu nguồn</strong><span class="ml-1 text-danger">*</span></div>
                            <div class="mt-2">                                        
                                <el-form-item label="" prop="dataSource">                                    
                                    <el-input v-model="itemModel.dataSource" size="large" placeholder="Schedule" clearable />
                                </el-form-item>   
                            </div>
                            <div class="mt-2"><strong>Dữ liệu đích</strong><span class="ml-1 text-danger">*</span></div>
                            <div class="mt-2">                                        
                                <el-form-item label="" prop="dataDestination">                                    
                                    <el-input v-model="itemModel.dataDestination" size="large" placeholder="Schedule" clearable />
                                </el-form-item>   
                            </div>
                            <div class="mt-2"><strong>Lập lịch chạy tiến trình (Cron Expression)</strong><span class="ml-1 text-danger">*</span></div>
                            <div class="mt-2">                                        
                                <el-form-item label="" prop="schedule" class="mb-1">                                    
                                    <el-input v-model="itemModel.schedule" size="large" placeholder="Schedule" clearable />
                                </el-form-item> 
                                <div class="mb-2">{{getCronExpressionReadable(itemModel.schedule)}}</div>
                            </div>
                            <!-- <div class="mt-2"><strong>Dag ID</strong><span class="ml-1 text-danger">*</span></div>
                            <div class="mt-2">
                                <el-form-item label="" prop="dag_id">                                            
                                    <el-input v-model="itemModel.dag_id" size="large" 
                                        placeholder="Dag ID" clearable />
                                </el-form-item>
                            </div> -->
                        </div>
                    </el-card>
                </el-form>  
                <!-- <div class="mt-3">
                    <div class="alert alert-warning alert-dismissible"> 
                        <h5><i class="fa-solid fa-circle-info"></i> Thông tin</h5>
                        <div>
                            Tiến trình lấy dữ liệu nguồn từ <strong>Sở TTTT - Database 1</strong> đến dữ liệu đích <strong>DataLake - Partition/Db1</strong> 
                            được lập lịch vào <strong>{{getCronExpressionReadable(itemModel.schedule)}}</strong>
                        </div>
                    </div>                    
                </div> -->
                <div class="text-center mt-3 pt-4 pb-4"
                    style="background-color: #f5f7fa">                    
                    <el-button size="large" type="primary"
                        @click="submitData">
                        <el-icon><CircleCheck /></el-icon>
                        <span>Lưu dữ liệu</span>
                    </el-button>
                    <el-button size="large" type="danger"
                        @click="$emit('onChangeView', { viewName: 'ListData', data: null })">
                        <div>
                            Thoát
                        </div>
                    </el-button>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
 
<style scoped lang="scss">
 
</style>