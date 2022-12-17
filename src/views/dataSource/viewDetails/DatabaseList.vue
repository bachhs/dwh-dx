<script
    lang="ts"
    src="@/scripts/dataSource/viewDetails/databaseList.ts"
></script>
<template>
    <div>
        <table
            class="table table-borderless table-customize table-head-fixed text-nowrap table-striped"
        >
            <thead>
                <tr>
                    <th>Database Name</th>
                    <th>Description</th>
                    <th>Database engine</th>
                    <th>Owner</th>
                    <th>Usage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <el-button
                            link
                            class="link-schema"
                            @click="
                                $emit('processingEvent', {
                                    eventName: 'SchemasList',
                                    dataItem: {},
                                })
                            "
                        >
                            <strong class="text-navy" style="font-size: 1rem">
                                <i class="fa-solid fa-database"></i> Database 1
                            </strong>
                        </el-button>
                    </td>
                    <td>No description</td>
                    <td>PostgreSQL</td>
                    <td>--</td>
                    <td>- 0th pctile</td>
                </tr>
                <tr>
                    <td>
                        <el-button
                            link
                            class="link-schema"
                            @click="
                                $emit('processingEvent', {
                                    eventName: 'SchemasList',
                                    dataItem: {},
                                })
                            "
                        >
                            <strong class="text-navy" style="font-size: 1rem">
                                <i class="fa-solid fa-database"></i> Database 2
                            </strong>
                        </el-button>
                    </td>
                    <td>No description</td>
                    <td>PostgreSQL</td>
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
