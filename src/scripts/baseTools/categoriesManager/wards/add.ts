import { ref, reactive, onMounted, defineAsyncComponent, watch } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { provinceApi } from "@/api/baseTools/provinceApi"; 
import { districtApi } from '@/api/baseTools/districtApi';
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
        let isEditMode = ref(false);
        const isLoading = ref(false);
        const provinceListOptions = ref<Array<any>>([]); 
        const districtListOptions = ref<Array<any>>([]); 
        const editFields = ref([ 
            { key: 'name', label: 'Tên Xã/Phường' },
            { key: 'full_name', label: 'Tên Xã/Phường dạng đầy đủ' },
            { key: 'full_path', label: 'Tên Xã/Phường bao gồm Huyện/Quận & Tỉnh/Thành phố' },
        ]);
        const provinceSelected = ref<any>(null);
        const districtSelected = ref<any>(null);
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
        });

        const initDependences =(typeData:string) => {
            return new Promise((resolve, reject) => { 
                if(typeData === 'province'){
                    provinceListOptions.value = [];
                    provinceApi.getItems({ page: 1, size: 999999 })
                        .then((provinceRes:any) => {
                            provinceListOptions.value = provinceRes.data.content;
                            if(provinceListOptions.value && provinceListOptions.value.length > 0){
                                provinceSelected.value = provinceListOptions.value[0].id;
                            } 
                            return resolve({});
                        })
                        .catch((error) => { return reject(error); });
                }
                else{                    
                    districtListOptions.value = [];
                    districtApi.getItemsByProvince(provinceSelected.value, { page: 1, size: 999999 })
                        .then((districtRes:any) => {
                            districtListOptions.value = districtRes.data.content;
                            if(districtListOptions.value && districtListOptions.value.length > 0){
                                districtSelected.value = districtListOptions.value[0].id;
                            }
                            return resolve({});
                        }).catch((error) => { return reject(error); });
                }
            })
        };

        watch(() => provinceSelected.value, () => {
            initDependences('district').then(() => {}).catch((error) => { console.error(error); });
        })

        const createNewItem = (data: any) => {
            if(!provinceSelected.value){
                ElMessage.error(`Tỉnh/Thành phố không hợp lệ, Vui lòng kiểm tra bạn đã chọn đúng Tỉnh/Thành phố từ danh sách có sẵn.`);
                return;
            }
            if(!districtSelected.value){
                ElMessage.error(`Quận/Huyện không hợp lệ, Vui lòng kiểm tra bạn đã chọn đúng Quận/Huyện từ danh sách có sẵn.`);
                return;
            }
            wardApi
                .addItem(districtSelected.value, data)
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
            initDependences('province')
                .then(() => {
                    initDependences('district')
                        .then(() => {
                            if (props.viewSettings) {
                                if (props.viewSettings.dataItem === null) {
                                    isEditMode.value = false;
                                    itemModel.value = {};
                                } else {
                                    isEditMode.value = true;
                                    const editItem = props.viewSettings.dataItem;
                                    provinceSelected.value = editItem.district.city.id;
                                    districtSelected.value = editItem.district.id;
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
                })
                .catch((error) => {
                    console.error(error); 
                    isLoading.value = false;
                }); 
        });
        return {
            isLoading,
            isEditMode,
            editFields,
            ruleFormRef,
            rules,
            provinceListOptions,
            districtListOptions,
            provinceSelected,
            districtSelected,
            itemModel,
            submitItemSubmit,
            moment,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, ['organization']),
    },
};
