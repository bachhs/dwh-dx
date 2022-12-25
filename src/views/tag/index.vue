<script src="@/scripts/tag/index.ts"></script>

<template>
    <div class="flex-fill d-flex flex-column w-100 p-2" v-loading="false">
        <div class="flex-fill row row-eq-height">
            <div class="col-12 col-md-2 d-flex flex-column">
                <el-card class="flex-fill" :body-style="{ padding: '0px' }">
                    <div class="p-2 pl-3 pr-3">
                        <div><strong class="text-navy">Tag Categories</strong></div>
                        <div class="mt-3">
                            <el-button class="w-100">
                                <el-icon><Plus /></el-icon>
                                <span class="ml-3">Add tag</span>
                            </el-button>
                        </div>
                    </div>
                    <div class="mt-2 tag-list-container">
                        <div class="card ml-3 mr-3">
                            <div class="card-body p-0">
                                <ul class="nav nav-pills flex-column">
                                    <li class="nav-item"
                                        v-bind:class="{ 'tag-selected': item === tagSelected }"
                                        v-for="item in 10" :key="item">
                                        <a href="javascript:void(0);" class="nav-link p-0"
                                            @click="tagSelected = item">
                                            <div class="tag-item d-flex align-items-center pt-2 pb-2 ml-2 mr-2">
                                                <div class="flex-fill tag-label">
                                                    PersonalData
                                                </div>
                                                <div class="bage-count badge">
                                                    5
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        
                        </div>
                        
                    </div>
                </el-card>
            </div>
            <div class="col-12 col-md-10 d-flex flex-column">
                <el-card class="flex-fill" :body-style="{ padding: '0px' }">
                    <div class="p-2 pl-3 pr-3">
                        <div class="d-flex">
                            <div class="flex-fill">Management for tag <strong class="text-navy">PersonalData</strong></div>
                            <div>
                                <el-button type="primary">Add new tag</el-button>
                                <el-button type="primary">Delete category</el-button>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p>Cụ thể, giá nhập từ nhà phân phối của sản phẩm này rơi vào khoảng 22 triệu đồng. Tuy nhiên, hiện tại trên thị trường giá của MacBook Air M1 đang dao động 20-23,5 triệu đồng. Có thể thấy tại nhiều chuỗi bán lẻ, giá bán ra của mẫu máy này đang thấp hơn cả giá nhập vào.</p>
                            <SetDescriptionModal>
                                <template #label>
                                    <div class="m-2 d-flex align-items-center">
                                        <el-icon :size="20">
                                            <Edit />
                                        </el-icon>
                                        <span class="ml-2">Edit</span>
                                    </div>
                                </template>
                            </SetDescriptionModal>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.nav-pills {
    .nav-item{
        transition: all 0.2s linear;
        border-left: 4px solid transparent;
        &:not(.tag-selected){
            &:hover{
                background-color: #f5f5f5;
            }
        }
        .nav-link {
            border-radius: 0 !important;
            background-color: transparent !important;
        }       
        .bage-count{
            background-color: #d0d0d0 !important;
            font-size: 0.8rem;
            color: #09345d;
        }
        &.tag-selected{
            color: #007bff;
            border-left: 4px solid #09345d;   
            .tag-label {
                color: #09345d;
                font-weight: 700;
            }         
            .bage-count{
                background-color: #09345d !important;
                color: #fff;
            }
        }
    }
}
</style>
