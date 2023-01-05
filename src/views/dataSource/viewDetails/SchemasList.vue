<script lang="ts" src="@/scripts/dataSource/viewDetails/schemaList.ts"></script>
<template>
    <el-scrollbar :style="`height: ${contentHeight};`">
        <div class="mt-1 ml-1 mr-1 callout callout-info p-2 pt-0 pb-0">
            <div class="d-flex">
                <div class="flex-fill line-clamp-2 position-relative">
                    <div v-if="databaseSelected.description" v-html="databaseSelected.description"></div>
                    <div v-else>Không có mô tả</div>
                    <div v-if="databaseSelected.description"
                        class="position-absolute bg-white" style="right: 0; bottom: 0;">
                        <ReadmoreModal
                            :dotPrefix="true"
                            :title="`Mô tả về ${databaseSelected.name}`" 
                            :content="databaseSelected.description" />
                    </div>
                </div>
                <div class="ml-3">
                    <SetDescriptionModal v-model="databaseSelected.description"
                        @onFormSubmit="(descHtml:string) => { updateDatabseDesc(databaseSelected.id, descHtml); }">
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
        <div>
            <table
                class="table table-borderless table-customize table-head-fixed text-nowrap table-striped">
                <thead>
                    <tr>
                        <th>Schema Name</th>
                        <th>Mô tả</th>
                        <th>Owner</th>
                        <th>Usage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="s in schemas" v-bind:key="s.id">
                        <td>
                            <el-button
                                link
                                class="link-schema"
                                @click="
                                    $emit('processingEvent', {
                                        eventName: 'TablesAndViews',
                                        dataItem: s,
                                    })
                                ">
                                <strong class="text-navy" style="font-size: 1rem">
                                    <i class="fa-solid fa-cube"></i>
                                    {{ s.name }}
                                </strong>
                            </el-button>
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div v-if="s.description">
                                    <span class="line-clamp-1" v-html="s.description.replace(/<[^>]*>/g, '')"></span>
                                </div>
                                <div v-else>Không có mô tả</div>
                                <ReadmoreModal v-if="s.description" :title="`Mô tả về ${s.name}`" :content="s.description" />
                                <SetDescriptionModal v-model="s.description" 
                                    @onFormSubmit="(descHtml:string) => { updateSchemaDesc(s.id, descHtml); }">
                                    <template #label>
                                        <span class="m-2 d-flex align-items-center">
                                            <el-icon :size="20">
                                                <Edit />
                                            </el-icon>
                                        </span>
                                    </template>
                                </SetDescriptionModal>
                            </div>   
                        </td>
                        <td>--</td>
                        <td>- 0th pctile</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </el-scrollbar>
</template>

<style scoped lang="scss">
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
