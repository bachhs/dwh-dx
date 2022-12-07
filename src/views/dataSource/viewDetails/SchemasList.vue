<script setup lang="ts">

</script>
<template>
    <div>
        <table class="table table-borderless table-customize table-head-fixed text-nowrap table-striped">
            <thead>
                <tr>
                    <th>Schema Name	</th>
                    <th>Description</th>
                    <th>Owner</th>
                    <th>Usage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <el-button link @click="$emit('processingEvent', { eventName: 'TablesAndViews', dataItem: {} })">
                            <strong class="text-primary" style="font-size: 1rem;">information_schema</strong>
                        </el-button>
                    </td>
                    <td>No description</td>
                    <td>--</td>
                    <td>- 0th pctile</td>
                </tr>
                <tr>
                    <td>
                        <el-button link @click="$emit('processingEvent', { eventName: 'TablesAndViews', dataItem: {} })">
                            <strong class="text-primary" style="font-size: 1rem;">public</strong>
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
    .table-customize{
        thead{
            tr{
                th{
                    box-shadow: none !important;
                    background-color: #d3eaff !important;
                    border: none !important;
                    &:before{
                        display: none !important;
                    }
                }
            }
        }
        tbody{
            tr{                
                &:nth-of-type(even) {
                    background-color: #e5e5e5;
                }
            }
        }
    }
</style>