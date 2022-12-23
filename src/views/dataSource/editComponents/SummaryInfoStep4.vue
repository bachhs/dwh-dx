<script lang="ts" setup>
    import { ref, watch, onMounted } from "vue";
    import { useDataCategoryStore } from '@/stores/dataCategory';
    const appState = useDataCategoryStore();
    const props = defineProps({
        dataSourceItem: { type: Object, required: true },
    });
    const showPassword = ref(false);
    const dataEngineItem = ref<any>({});
    const itemModel = ref<any>(props.dataSourceItem);
    const getDataEngineItem = (key:string) =>{
        console.log('getDataEngineItem', key);
        let paramItem = appState.databaseEngineOptions.find((pItem:any) => pItem.key === key);
        if(paramItem) return paramItem;
        return { name: "Không xác định" };
    }
    watch(() => props.dataSourceItem, (newVal) =>{
        itemModel.value = newVal;
        dataEngineItem.value = getDataEngineItem(newVal.databaseEngineSelected);
    });
    onMounted(() =>{        
        dataEngineItem.value = getDataEngineItem(itemModel.value.databaseEngineSelected);
    });
    const getDataSourceType = (val:string) => {
        switch(val){
            case "database":
                return "Database";
                break;
            case "file":
                return "File";
                break;
            case "api":
                return "API";
                break;
        }
        return "Không xác định";
    };
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
                        {{itemModel.organizationName}}
                    </td>
                </tr>
                <tr>
                    <td>Loại dữ liệu</td>
                    <td>{{getDataSourceType(itemModel.typeOfDataIn)}}</td>
                </tr>
                <tr v-if="itemModel.typeOfDataIn === 'database'">
                    <td style="vertical-align: middle;">Database Engine</td>
                    <td style="vertical-align: middle;">
                        <div class="d-flex align-items-center">
                            <div class="mt-1 mb-1 mr-2"
                                v-if="dataEngineItem && dataEngineItem !== null && dataEngineItem.iconName">
                                <img :src="`/icons/databases/${dataEngineItem.iconName}`"
                                    style=" height: 1.5rem; " />
                            </div>
                            <div v-if="dataEngineItem && dataEngineItem !== null">
                                {{dataEngineItem.name}}
                            </div>
                        </div>
                    </td>
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
                        {{ itemModel.username }}
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <span v-if="showPassword">{{ itemModel.password }}</span>
                            <span v-else>{{ itemModel.password.replace(/./g, '*') }}</span>
                            <el-button link class="ml-3"
                                @click="showPassword = !showPassword">
                                <i class="far fa-eye"></i>
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>DB name</td>
                    <td>{{ itemModel.dbName }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>