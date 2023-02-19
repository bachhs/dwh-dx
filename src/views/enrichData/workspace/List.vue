<template>
    <div class="flex-fill d-flex flex-column w-100">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4>
                    <i class="fas fa-rocket text-danger mr-2"></i>
                    <strong>Không gian làm việc</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">     
                <div>
                    <el-radio-group v-model="workspaceGroup" class="mb-0" size="large">
                        <el-radio-button class="mb-0" label="myworkspace">Không gian làm việc của tôi</el-radio-button>
                        <el-radio-button class="mb-0" label="sharedWithMe">Được chia sẻ với tôi</el-radio-button>
                    </el-radio-group>
                </div>               
                <div class="ml-4">
                    <el-button size="large" type="primary"
                        @click="$emit('changeView', { name: 'AddData' })">
                        <el-icon :size="20" style="vertical-align: middle">
                            <Plus />
                        </el-icon>
                    </el-button>

                    <el-button size="large">
                        <el-icon :size="20" style="vertical-align: middle">
                            <Refresh />
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
            <el-scrollbar class="w-100 flex-fill" v-if="workspaceItems && workspaceItems.length > 0">
                <div class="mt-0 mr-3">
                    <div class="mt-3" v-if="workspaceGroup === 'myworkspace'">
                        <div class="row row-eq-height">
                            <div class="col-12 col-md-3 mb-3 animate__animated animate__zoomIn" 
                            v-for="item in 20" :key="item">
                                <el-card :body-style="{ padding: '0.8rem 0.8rem' }"
                                    class="cursor-pointer position-relative workspace-item-wrapper">
                                    <div>
                                        <div>
                                            <h5 class="mb-1">
                                                <i class="fas fa-rocket text-lightblue mr-2"></i><span>Dữ liệu {{item}} Tỉnh Tuyên Quang</span>
                                            </h5>
                                        </div>
                                        <div class="d-flex align-items-center" style="font-size: 90%;">
                                            <el-icon class="text-primary"><Clock /></el-icon>
                                            <span class="ml-2 text-muted">Chỉnh sửa lần cuối 1 giờ trước</span>
                                        </div> 
                                        <div class="text-nowrap item-actions ml-2 mb-3 d-flex align-items-center">
                                            <div class="text-center w-100">
                                                <el-button size="small"
                                                    @click="$emit('changeView', { name: 'DataSetList' })">
                                                    <el-icon class="text-primary" :size="16" style="vertical-align: middle">
                                                        <InfoFilled />
                                                    </el-icon>
                                                    <span class="ml-2 text-muted">Chi tiết</span>
                                                </el-button>

                                                <el-button size="small">
                                                    <el-icon class="text-primary" :size="16" style="vertical-align: middle">
                                                        <Share />
                                                    </el-icon>
                                                    <span class="ml-2 text-muted">Chia sẻ</span>
                                                </el-button>

                                                <el-button type="danger" size="small">
                                                    <el-icon :size="16" style="vertical-align: middle">
                                                        <Delete />
                                                    </el-icon>
                                                    <span class="ml-2">Xoá</span>
                                                </el-button>
                                            </div>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                    <div v-else class="mt-4">
                        <no-data title="Không có Workspace nào được chia sẻ với bạn" 
                                subTitle="Các Workspace được chia sẻ sẽ hiển thị ở đây. vui lòng quay lại sau"/>
                    </div>
                </div>
            </el-scrollbar>  
            <div v-else class="w-100 flex-fill d-flex align-items-center">
                <no-data title="Chưa có Workspace nào được tạo" 
                    subTitle="Thêm mới wordspace để import dữ liệu">
                    <template #contentBottom>
                        <div class="mt-3">
                            <el-button size="large" type="primary">
                                <el-icon :size="20" style="vertical-align: middle">
                                    <Plus />
                                </el-icon>
                                <span class="ml-2">Thêm mới không gian làm việc</span>
                            </el-button>
                        </div>
                    </template>
                </no-data>
            </div>
        </div>            
        <div class="d-flex justify-content-end w-100">
            <el-pagination class="self-align-end" background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const workspaceGroup = ref("myworkspace");
const workspaceItems = ref([""]);
defineEmits(['changeView'])
</script>


<style lang="scss" scoped>
.workspace-item-wrapper{
    cursor: pointer;
    .item-actions{
        right: -0.8rem;
        left: -0.8rem;
        bottom: -0.8rem;
        background-color: rgba(136, 184, 255, 0);
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        opacity: 1; 
        transform: scale(0);
    }

    &:hover {
        .item-actions{
            transition: all 0.3s;
            transition-delay: 0.1s;
            opacity: 1;
            transform: none;
        }
    }
}
</style>