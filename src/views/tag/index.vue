<script src="@/scripts/tag/index.ts"></script>

<template>
    <div class="flex-fill d-flex flex-column w-100 p-2" v-loading="false">
        <div class="flex-fill row row-eq-height">
            <div class="col-12 col-md-2 d-flex flex-column">
                <el-card class="flex-fill" 
                    v-loading="isLoadingTagCategory"
                    :body-style="{ padding: '0px' }">
                    <div class="p-2 pl-3 pr-3">
                        <div><strong class="text-navy">Danh mục tag</strong></div>
                        <div class="mt-3 d-flex align-items-center">
                            <div class="flex-fill">
                                <el-button class="w-100" 
                                    type="primary"    
                                    @click="openAddTagCategoryModal">
                                    <el-icon><Plus /></el-icon>
                                    <span class="ml-1">Thêm danh mục tag</span>
                                </el-button>
                            </div>
                            <div class="ml-2">
                                <el-button @click="refreshTagData">
                                    <el-icon><Refresh /></el-icon>
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 tag-list-container">
                        <!-- {{ tagItemData }} -->
                        <div class="card ml-3 mr-3">
                            <div class="card-body p-0">
                                <ul class="nav nav-pills flex-column"
                                    v-if="tagItemData && tagItemData.data && tagItemData.data.length > 0">
                                    <li class="nav-item"
                                        v-bind:class="{ 'tag-selected': tagItem.id === tagSelected.id }"
                                        v-for="tagItem in tagItemData.data" :key="tagItem.id">
                                        <a href="javascript:void(0);" class="nav-link p-0"
                                            @click="tagSelected = tagItem">
                                            <div class="tag-item d-flex align-items-center pt-2 pb-2 ml-2 mr-2">
                                                <div class="flex-fill tag-label">
                                                    {{tagItem.name}}
                                                </div>
                                                <div class="bage-count badge">
                                                    {{tagItem.children ? tagItem.children.length: 0}}
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
                    <div class="p-2 pl-3 pr-3 d-flex flex-column" 
                        v-if="tagSelected" 
                        :style="`height: calc(100vh - 7rem);`">
                        <div class="d-flex">
                            <div class="flex-fill">
                                <h4><strong class="text-navy">{{tagSelected.name}}</strong></h4>
                            </div>
                            <div>
                                <!-- <el-button type="primary">
                                    <el-icon><Refresh /></el-icon> 
                                    <span class="ml-1 d-none d-md-inline">Làm mới</span>
                                </el-button> -->
                                <el-button class="ml-1 ml-md-2" type="primary">
                                    <el-icon><Plus /></el-icon> 
                                    <span class="ml-1 d-none d-md-inline" @click="openAddTagChildModal">Thêm mới tag</span>
                                </el-button>
                                <el-button class="ml-1 ml-md-2" type="danger"
                                    @click="deleteTagCategory">
                                    <el-icon><Delete /></el-icon>
                                    <span class="ml-1 d-none d-md-inline">Xoá danh mục</span>
                                </el-button>
                            </div>
                        </div>
                        <div class="mt-2 card p-3 pt-0 pb-0">
                            <div class="d-flex">
                                <div class="flex-fill">
                                    <div v-if="tagSelected.description" v-html="tagSelected.description"></div>
                                    <div v-else>Không có mô tả</div>
                                </div>
                                <div class="ml-3">
                                    <SetDescriptionModal v-model="tagSelected.description"
                                        @onFormSubmit="(descriptionHTML) => updateTagCategory(descriptionHTML)">
                                        <template #label>
                                            <div class="m-2 d-flex align-items-center">
                                                <el-icon :size="20">
                                                    <Edit />
                                                </el-icon>
                                                <span class="ml-0"></span>
                                            </div>
                                        </template>
                                    </SetDescriptionModal>
                                </div>
                            </div>
                        </div>
                        <el-scrollbar class="flex-fill" >
                            <div class="mr-3">
                                <table v-if="tagSelected && tagSelected.children && tagSelected.children.length > 0"
                                    class="w-100 table table-borderless table-customize table-head-fixed text-nowrap table-striped">
                                    <thead>
                                        <tr>
                                            <th style="width: 1%;" class="text-nowrap">Tên Tag</th>
                                            <th class="text-left">Mô tả</th>
                                            <th style="width: 1%;" class="text-nowrap">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="tagChildItem in tagSelected.children" v-bind:key="tagChildItem.id">
                                            <td class="text-nowrap" style="vertical-align: top;">
                                                <div class="pr-3">
                                                    <strong class="text-navy">{{tagChildItem.name}}</strong>
                                                </div>
                                            </td>
                                            <td  style="vertical-align: top;">
                                                <div class="w-100 d-flex align-items-start">
                                                    <div v-if="tagChildItem.description">
                                                        <div class="text-normal description-html-text" style="white-space: normal;" 
                                                            v-html="tagChildItem.description"></div>
                                                    </div>
                                                    <div v-else>No description</div>
                                                    <SetDescriptionModal v-model="tagChildItem.description"
                                                        @onFormSubmit="(descriptionHTML) => updateTagItem(tagChildItem, descriptionHTML)">
                                                        <template #label>
                                                            <span class="ml-2 mr-2 d-flex align-items-center">
                                                                <el-icon :size="20">
                                                                    <Edit />
                                                                </el-icon>
                                                            </span>
                                                        </template>
                                                    </SetDescriptionModal>
                                                </div>   
                                            </td>
                                            <td class="text-center"  style="vertical-align: top;">
                                                <el-tooltip
                                                    class="box-item text-nowrap"
                                                    effect="dark"
                                                    content="Xoá"
                                                    placement="left" >
                                                    <el-button
                                                        size="large"
                                                        link
                                                        class="text-danger"
                                                        @click="deleteTagItem(tagChildItem)">
                                                        <el-icon
                                                            :size="20"
                                                            style="vertical-align: middle;" >
                                                            <Delete />
                                                        </el-icon>
                                                    </el-button>
                                                </el-tooltip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>                                
                                <div v-else>
                                    <no-data class="mt-2 mt-md-5"/>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </el-card>
            </div>
        </div>

        <el-dialog
            v-model="centerDialogVisible"
            close-on-click-modal="false"
            title="Thêm mới danh mục tag"
            width="99%"
            style="max-width: 60rem;"
            align-center
            v-loading="centerDialogVisible && isLoadingSubmit">
            <div>
                <TagInfoEdit ref="addTagCategoryModalRef" v-model="tagSelected"
                    @modalCloseTrigger="centerDialogVisible = false"
                    @submit="(formData) => { addTagCategory(formData) }"/>
            </div>
        </el-dialog>

        <el-dialog
            v-model="centerDialogChildVisible"
            close-on-click-modal="false"
            title="Thêm mới tag"
            width="99%"
            style="max-width: 60rem;"
            align-center
            v-loading="centerDialogChildVisible && isLoadingSubmit">
            <div>
                <TagInfoEdit ref="addTagChildModalRef" :isCategoryEdit="false"
                    @modalCloseTrigger="centerDialogChildVisible = false"
                    @submit="(formData) => { addTagItem(formData) }"/>
            </div>
        </el-dialog>
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
            color: #707070;
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

.table-customize {
    thead {
        tr {
            th {
                box-shadow: none !important;
                background-color: #d3eaff !important;
                border: none !important;
                &:before {
                    display: none !important;
                }
            }
        }
    }
    tbody {
        tr {
            &:nth-of-type(even) {
                background-color: #e5e5e5;
            }
            .link-schema {
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
