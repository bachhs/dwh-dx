<template>
    <div>
        <div class="row mt-2 w-100">
            <div
                class="col-12 col-md-2 type-datasource-item"
                v-for="item in fileTypeDataSourceOptions"
                :key="item.key" >
                <label class="d-block">
                    <input
                        type="radio"
                        class="radio-selection"
                        :value="item.key"
                        v-model=" itemModel.fileTypeSelected "
                    />
                    <el-card
                        :body-style="{ padding: '0.5rem 0.8rem', }"
                        style=" height: auto; overflow: hidden; "
                        class="mb-3" >
                        <div class="position-relative">
                            <div class="mt-1 mb-1">
                                <h3 class="text-uppercase user-select-none">
                                    {{ item.key }}
                                </h3>
                            </div>
                            <div class="text-nowrap mt-2" >
                                <span
                                    class="item--name" >{{ item.name }}</span >
                            </div>
                            <div
                                class="position-absolute type-datasource-item--icon-selected d-none"
                                style=" right: 0.5rem; top: 0.5rem; " >
                                <el-icon
                                    :size="30"
                                    color="white"
                                    ><Check/></el-icon>
                            </div>
                        </div>
                    </el-card>
                </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    //import { FileSelector, Dropzone, DialogButton } from 'vue3-file-selector';
    //import { humanFileSize } from "@/helpers/ultilityFunctions";
    const props = defineProps({
        dataSourceItem: { type: Object, required: true },
        fileTypeDataSourceOptions: { type: Array<any>, required: true },
    });
    const itemModel = props.dataSourceItem;
    // const controllerUpload = new AbortController();
    // const fileSelectorRef = ref<any>(null);
    // const files = ref([]);
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
