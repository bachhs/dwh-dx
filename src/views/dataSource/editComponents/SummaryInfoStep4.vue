<script lang="ts" setup>
    const props = defineProps({
        dataSourceItem: { type: Object, required: true },
    });
    const itemModel = props.dataSourceItem;
</script>
<template>
    <div>
        <table class="table table-hover text-nowrap" >
            <thead>
                <tr>
                    <th style="width: 1%">
                        Tên thông tin
                    </th>
                    <th>Giá trị</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tên nguồn dữ liệu</td>
                    <td>
                        {{ itemModel.nameOfDS }}
                    </td>
                </tr>
                <tr>
                    <td>Mô tả nguồn dữ liệu</td>
                    <td>
                        {{ itemModel.descOfDS }}
                    </td>
                </tr>
                <tr>
                    <td>Dữ liệu thuộc đơn vị</td>
                    <td>
                        Bộ thông tin và truyền thông
                    </td>
                </tr>
                <tr>
                    <td>Loại dữ liệu</td>
                    <td>Database</td>
                </tr>
                <tr>
                    <td>Database Engine</td>
                    <td>PostgreSQL</td>
                </tr>
                <tr>
                    <td>IP address/ Host name</td>
                    <td>{{ itemModel.host }}</td>
                </tr>
                <tr>
                    <td>Cổng kết nối</td>
                    <td>{{ itemModel.port }}</td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>
                        {{ itemModel.Username }}
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        {{ itemModel.Password }}
                    </td>
                </tr>
                <tr>
                    <td>DB name</td>
                    <td>{{ itemModel.DBName }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>