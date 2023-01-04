<script
    lang="ts"
    src="@/scripts/dataSource/viewDetails/databaseList.ts"></script>
<template>
    <el-scrollbar :style="`height: ${contentHeight};`">
        <div>
            <table
                class="table table-borderless table-customize table-head-fixed text-nowrap table-striped">
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
                    <tr v-for="d in databases" v-bind:key="d.id">
                        <td>
                            <el-button
                                link
                                class="link-schema"
                                @click="
                                    $emit('processingEvent', {
                                        eventName: 'SchemasList',
                                        dataItem: d,
                                    })
                                ">
                                <strong class="text-navy" style="font-size: 1rem">
                                    <i class="fa-solid fa-database"></i>
                                    {{ d.name }}
                                </strong>
                            </el-button>
                        </td>
                        <!-- <td>{{ d.description }}</td>
                        <td>{{ d.engine }}</td>
                        <td>{{ d.owner }}</td>
                        <td>{{ d.usage }}</td> -->
                        <td>
                            <div class="d-flex align-items-center">
                                <div v-if="d.description">
                                    <span class="line-clamp-1" v-html="d.description.replace(/<[^>]*>/g, '')"></span>
                                </div>
                                <div v-else>No description</div>
                                <SetDescriptionModal v-model="d.description"
                                    @onFormSubmit="(descHtml:string) => { updateDatabseDesc(d.id, descHtml); }">
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
                        <td>{{d.serviceType}}</td>
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
