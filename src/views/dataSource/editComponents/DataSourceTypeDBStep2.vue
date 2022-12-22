<template>
    <div>
        <div class="row mt-2 w-100" v-if="databaseEngineOptions">
            <div
                class="col-12 col-md-2 type-datasource-item"
                v-for="item in databaseEngineOptions"
                :key="item.id">
                <label class="d-block">
                    <input
                        type="radio"
                        class="radio-selection"
                        :value="item.id"
                        v-model=" itemModel.databaseEngineSelected "/>
                    <el-card
                        :body-style="{ padding: '0.5rem 0.8rem', }"
                        style=" height: auto; overflow: hidden; "
                        class="mb-3">
                        <div class="position-relative">
                            <div class="mt-1 mb-1">
                                <img :src="`/icons/databases/${item.iconName}`"
                                    style=" height: 2.5rem; " />
                            </div>
                            <div class="text-nowrap mt-2">
                                <span class="item--name">{{ item.name }}</span>
                            </div>
                            <div
                                class="position-absolute type-datasource-item--icon-selected d-none"
                                style=" right: 0.5rem; top: 0.5rem; " >
                                <el-icon :size="40" color="white" ><Check/></el-icon>
                            </div>
                        </div>
                    </el-card>
                </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    const props = defineProps({
        dataSourceItem: { type: Object, required: true },
        databaseEngineOptions: { type: Array<any>, required: true },
    });
    const itemModel = ref<any>(props.dataSourceItem);
    watch(() => props.dataSourceItem, (newVal) =>{
        itemModel.value = newVal;
        console.log('dataSourceItem changed',newVal);
    });
</script>

<style scoped lang="scss">
.radio-selection {
    visibility: hidden;
    display: none;
}

.type-datasource-item {
    label {
        cursor: pointer;
    }

    .radio-selection {
        &:checked + .el-card {
            background-color: #5ca6e5;
            color: #fff;

            .item--name {
                font-weight: 600;
            }

            .type-datasource-item--icon-selected {
                display: block !important;
            }
        }
    }
}

</style>
