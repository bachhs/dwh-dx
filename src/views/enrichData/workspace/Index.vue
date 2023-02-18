
import type { Share } from '@element-plus/icons-vue';

<script lang="ts" src="@/scripts/enrichData/workspace/index.ts"></script>
<template>
    <el-card
        class="box-card w-100 d-flex flex-fill flex-column"
        :body-style="{ padding: '0.8rem 1rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center">
                <div class="flex-fill d-none d-md-block">
                    <h4>
                        <i class="fas fa-rocket text-danger mr-2"></i>
                        <strong>Không gian làm việc</strong>
                    </h4>
                </div>
                <div class="d-flex align-items-center">                    
                    <div class="ml-1">
                        <el-button size="large" type="primary">
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
                        <div>
                            <el-radio-group v-model="workspaceGroup" size="large">
                                <el-radio-button label="myworkspace">Không gian làm việc của tôi</el-radio-button>
                                <el-radio-button label="sharedWithMe">Được chia sẻ với tôi</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="mt-3">
                            <div class="row row-eq-height">
                                <div class="col-12 col-md-3 mb-3 animate__animated animate__zoomIn" v-for="item in 20" :key="item">
                                    <el-card :body-style="{ padding: '0.8rem 0.8rem' }"
                                        class="cursor-pointer position-relative workspace-item-wrapper">
                                        <div>
                                            <div>
                                                <h5>
                                                    <i class="fas fa-rocket text-lightblue mr-2"></i><span>Dữ liệu {{item}} Tỉnh Tuyên Quang</span>
                                                </h5>
                                            </div>
                                            <div class="d-flex align-items-center" style="font-size: 90%;">
                                                <el-icon class="text-primary"><Clock /></el-icon>
                                                <span class="ml-2 text-muted">Chỉnh sửa lần cuối 1 giờ trước</span>
                                            </div>
                                            <div>&nbsp;</div>
                                            <div class="text-nowrap position-absolute item-actions d-flex align-items-center">
                                                <div class="text-center w-100">
                                                    <el-button>
                                                        <el-icon class="text-primary" :size="20" style="vertical-align: middle">
                                                            <InfoFilled />
                                                        </el-icon>
                                                        <span class="ml-2 text-muted">Chi tiết</span>
                                                    </el-button>

                                                    <el-button>
                                                        <el-icon class="text-primary" :size="20" style="vertical-align: middle">
                                                            <Share />
                                                        </el-icon>
                                                        <span class="ml-2 text-muted">Chia sẻ</span>
                                                    </el-button>

                                                    <el-button type="danger">
                                                        <el-icon :size="20" style="vertical-align: middle">
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
    </el-card>
</template>
<style lang="scss" scoped>
.workspace-item-wrapper{
    cursor: pointer;
    .item-actions{
        right: -0.8rem;
        top: -0.8rem;
        left: -0.8rem;
        bottom: -0.8rem;
        background-color: rgba(136, 184, 255, 0.95);
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