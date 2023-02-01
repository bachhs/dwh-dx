<template>
    <div>
        <div>
            <div class="mt-2">
                <strong>Cách tải lên dữ liệu file</strong
                ><span class="ml-1 text-danger">*</span>
            </div>
            <div class="mt-2">
                <el-select v-model="methodUploadSelected" class="w-100" placeholder="Chọn cách tải lên dữ liệu file" size="large">
                    <el-option label="Upload tệp trực tiếp lên server" value="upload_file" />
                    <el-option label="Tạo embed link để upload file" value="embed_link" />
                </el-select>
            </div>
        </div>
        <div class="row mt-4 w-100"
            v-if="methodUploadSelected === 'upload_file'">            
            <div
                class="col-12 col-md-2 type-datasource-item"
                v-for="item in fileTypeDataSourceOptions"
                :key="item.key" >
                <label class="d-block">
                    <input
                        type="radio"
                        class="radio-selection"
                        :value="item.key" :disabled="!allowedEdit"
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
    import { ref, watch } from 'vue';
    //import { FileSelector, Dropzone, DialogButton } from 'vue3-file-selector';
    //import { humanFileSize } from "@/helpers/ultilityFunctions";
    const props = defineProps({
        allowedEdit: { type: Boolean, required: false, default: true },
        dataSourceItem: { type: Object, required: true },
        fileTypeDataSourceOptions: { type: Array<any>, required: true },
    });
    const itemModel = ref<any>(props.dataSourceItem);
    watch(() => props.dataSourceItem, (newVal) =>{
        itemModel.value = newVal;
    });
    const methodUploadSelected = ref<string>('upload_file')
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
