<template>
    <div>
        <div class="row row-eq-height mt-2 w-100" 
                v-if="databaseEngineOptions">
            <div
                class="type-datasource-item d-flex flex-row m-2"
                v-for="item in databaseEngineOptions"
                :key="item.id">
                <label class="d-block mb-0 flex-fill w-100 d-flex flex-row">
                    <input
                        type="radio"
                        class="radio-selection"
                        :value="item.id" :disabled="!allowedEdit"
                        v-model=" itemModel.databaseEngineSelected "/>
                    <el-card
                        :body-style="{ padding: '0.8rem 0.8rem', }"
                        style=" height: auto; overflow: hidden; "
                        class="mb-0 flex-fill w-100 d-flex flex-column">
                        <div class="position-relative flex-fill d-flex flex-column">
                            <div class=flex-fill></div>
                            <div class="text-center">
                                <img class="dbIconImg" :src="`/icons/databases/${item.iconName}`" />
                            </div>
                            <div class="text-center text-nowrap mt-1">
                                <span class="item--name">{{ item.name }}</span>
                            </div>
                            <div v-if="allowedEdit"
                                class="d-none d-md-block position-absolute type-datasource-item--icon-selected d-none"
                                style=" right: -0.5rem; top: -0.5rem; " >
                                <el-icon :size="20" color="white" ><CircleCheck/></el-icon>
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
        allowedEdit: { type: Boolean, required: false, default: true },
        dataSourceItem: { type: Object, required: true },
        databaseEngineOptions: { type: Array<any>, required: true },
    });
    const itemModel = ref<any>(props.dataSourceItem);
    watch(() => props.dataSourceItem, (newVal) =>{
        itemModel.value = newVal;
    });
</script>

<style scoped lang="scss">
.radio-selection {
    visibility: hidden;
    display: none;
}

.type-datasource-item {
    height: 5rem; 
    width: 5rem;
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

    .dbIconImg{
        height: 2rem;
    }
    .item--name{
        font-size: 0.7rem;
    }
}

@media screen and (min-width: 880px){
    .type-datasource-item {
        height: 7rem; 
        width: 7rem;
        .dbIconImg{
            height: 3.8rem;
        }
        .item--name{
            font-size: 0.9rem;
        }
    }
}
</style>
