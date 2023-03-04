import { ref, reactive, onMounted, defineAsyncComponent } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { wardApi } from '@/api/baseTools/wardApi';
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
        let isEditMode = false;
        const isLoading = ref(false);
        const editFields = ref([ 
            { key: 'name', label: 'Tên Xã/Phường' },
            { key: 'full_name', label: 'Tên Xã/Phường dạng đầy đủ' },
            { key: 'full_path', label: 'Tên Xã/Phường bao gồm Huyện/Quận & Tỉnh/Thành phố' },
        ]);
        const itemModel = ref<any>({
            countryId: 1,
        });

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
        });

        const createNewItem = (data: any) => {
            wardApi
                .addItem(data)
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
            wardApi
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
                        if (!isEditMode) createNewItem(data);
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
            if (props.viewSettings) {
                if (props.viewSettings.dataItem === null) {
                    isEditMode = false;
                    itemModel.value = {
                        countryId: 1,
                    };
                } else {
                    isEditMode = true;
                    const editItem = props.viewSettings.dataItem;
                    itemModel.value = {
                        countryId: 1,
                        id: editItem.id,
                    };
                    editFields.value.forEach((xField) => {
                        itemModel.value[xField.key] = editItem[xField.key];
                    });
                }
            }
        });
        return {
            isLoading,
            editFields,
            ruleFormRef,
            rules,
            itemModel,
            submitItemSubmit,
            moment,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, ['organization']),
    },
};
