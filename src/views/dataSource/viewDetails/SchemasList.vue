<script lang="ts" src="@/scripts/dataSource/viewDetails/schemaList.ts"></script>
<template>
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
                    <td>No description</td>
                    <td>--</td>
                    <td>- 0th pctile</td>
                </tr>
            </tbody>
        </table>
    </div>
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
