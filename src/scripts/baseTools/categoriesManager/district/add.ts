import { ref, reactive, onMounted, defineAsyncComponent } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { provinceApi } from "@/api/baseTools/provinceApi"; 
import { districtApi } from '@/api/baseTools/districtApi';
import moment from 'moment';
import SkeletonBox from '@/components/SkeletonBox.vue';
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    components: {
        EditCategory: defineAsyncComponent({
            loader: () =>
                import(
                    '@/views/baseTools/categoriesManager/_crudComponents/EditCategory.vue'
                ),
            loadingComponent: SkeletonBox,
        }),
    },
    setup(props: any, context: any) {
        let isEditMode = ref(false);
        const isLoading = ref(false);
        const provinceListOptions = ref<Array<any>>([]); 
        const editFields = ref([ 
            { key: 'name', label: 'Tên Huyện/Quận' },
            { key: 'full_name', label: 'Tên Huyện/Quận dạng đầy đủ' },
            { key: 'full_path', label: 'Tên Huyện/Quận bao Tỉnh/Thành phố' },
        ]);
        const provinceSelected = ref<any>(null);
        const itemModel = ref<any>({});
        const ruleFormRef = ref<FormInstance>();
        const rules = reactive<FormRules>({ 
            name: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
            full_name: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
            full_path: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
        });

        const initDependences =() => {
            return new Promise((resolve, reject) => {
                provinceListOptions.value = [];
                provinceApi.getItems({ page: 1, size: 999999 })
                    .then((provinceRes:any) => {
                        provinceListOptions.value = provinceRes.data.content;
                        if(provinceListOptions.value && provinceListOptions.value.length > 0){
                            provinceSelected.value = provinceListOptions.value[0].id;
                        }
                        return resolve(provinceListOptions.value);
                    }).catch((error) => { return reject(error); });
            })
        };

        const createNewItem = (data: any) => {
            if(!provinceSelected.value){
                ElMessage.error(`Tỉnh/Thành phố không hợp lệ, Vui lòng kiểm tra bạn đã chọn đúng Tỉnh/Thành phố từ danh sách có sẵn.`);
                return;
            }
            districtApi
                .addItem(provinceSelected.value, data)
                .then((response: any) => {
                    if (response.data) {
                        ElMessage({
                            message: 'Thêm mới thành công',
                            type: 'success',
                        });
                        context.emit('onChangeView', {
                            viewName: 'ListData',
                            data: null,
                        });
                    } else {
                        ElMessage.error(`Oops, ${response.data.message}`);
                    }
                    isLoading.value = false;
                })
                .catch((error) => {
                    console.error(error);
                    isLoading.value = false;
                });
        };

        const modifyItem = (itemId: number, data: any) => {
            districtApi
                .updateItem(itemId, data)
                .then((response: any) => {
                    if (response.data) {
                        ElMessage({
                            message: 'Cập nhật thành công',
                            type: 'success',
                        });
                        context.emit('onChangeView', {
                            viewName: 'ListData',
                            data: null,
                        });
                    } else {
                        ElMessage.error(`Oops, ${response.data.message}`);
                    }
                    isLoading.value = false;
                })
                .catch((error) => {
                    console.error(error);
                    isLoading.value = false;
                });
        };

        const submitItemSubmit = async () => {
            if (!ruleFormRef.value || !ruleFormRef.value) return;
            await ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    isLoading.value = true;
                    try {
                        const data = {
                            ...itemModel.value,
                        };
                        if (!isEditMode.value) createNewItem(data);
                        else modifyItem(itemModel.value.id, data);
                    } catch (err) {
                        console.log(err);
                        isLoading.value = false;
                    }
                } else {
                    console.log('error submit!', fields);
                }
            });
        };

        onMounted(() => {
            isLoading.value = true;
            initDependences()
                .then(() => {
                    if (props.viewSettings) {
                        if (props.viewSettings.dataItem === null) {
                            isEditMode.value = false;
                            itemModel.value = {};
                        } else {
                            isEditMode.value = true;
                            const editItem = props.viewSettings.dataItem;
                            provinceSelected.value = editItem.city.id;
                            itemModel.value = { 
                                id: editItem.id,
                            };
                            editFields.value.forEach((xField) => {
                                itemModel.value[xField.key] = editItem[xField.key];
                            });
                        }
                    }
                    isLoading.value = false;
                })
                .catch((error) => {
                    console.error(error); 
                    isLoading.value = false;
                }); 
        });
        return {
            isLoading,
            editFields,
            ruleFormRef,
            rules,
            isEditMode,
            provinceListOptions,
            provinceSelected,
            itemModel,
            submitItemSubmit,
            moment,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, ['organization']),
    },
};
