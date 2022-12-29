<script lang="ts" src="@/scripts/dataSource/viewDetails/schemaList.ts"></script>
<template>
    <el-scrollbar :style="`height: ${contentHeight};`">
        <div>
            <table
                class="table table-borderless table-customize table-head-fixed text-nowrap table-striped">
                <thead>
                    <tr>
                        <th>Schema Name</th>
                        <th>Description</th>
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
                                <div v-else>No description</div>
                                <SetDescriptionModal v-model="s.description">
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
