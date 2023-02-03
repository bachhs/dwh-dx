import { ref, onMounted, watch } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { fileEmbedLinkApi } from '@/api/fileEmbedLinkApi';
import moment from 'moment';
const appState = useDataCategoryStore();
const organizationList = appState.organization;
const startOfDay = moment().startOf('day');
const endOfDay = moment().add(1, 'months').startOf('day');
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup(props: any, context: any) {
        const isLoading = ref(false);
        const currentOrganizationName = ref('');
        const validDateModel = ref([startOfDay.format("YYYY-MM-DD HH:mm:ss"), endOfDay.format("YYYY-MM-DD HH:mm:ss")]);
        const itemModel = ref({
            organizationId: 0,
            validFrom: moment(validDateModel.value[0]).toDate(),
            validTo: moment(validDateModel.value[1]).toDate(),
        }); 

        const onOrganizationChanged = (item:any)=>{
            currentOrganizationName.value = item.name;
        };

        const addItemSubmit = () => {
            isLoading.value = true;
            try {
                const data = {
                    organization_id: itemModel.value.organizationId,
                    valid_from: itemModel.value.validFrom,
                    valid_to: itemModel.value.validTo,
                };
                fileEmbedLinkApi
                    .addItem(data)
                    .then((response: any) => {
                        if (response.data) {
                            ElMessage({
                                message: 'Thêm mới nguồn dữ liệu thành công',
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
            } catch (err) {
                console.log(err);
                isLoading.value = false;
            }
        }; 

        watch(() => validDateModel.value, () => {
            itemModel.value.validFrom = moment(validDateModel.value[0]).toDate();
            itemModel.value.validTo = moment(validDateModel.value[1]).toDate();
        });

        onMounted(() => {
            if (props.viewSettings) {
                if(props.viewSettings.dataItem === null){
                    currentOrganizationName.value = appState.defaultOrganization.name;
                    itemModel.value = {
                        organizationId: appState.defaultOrganization.id,
                        validFrom: moment(validDateModel.value[0]).toDate(),
                        validTo: moment(validDateModel.value[1]).toDate(),
                    };
                }
                else{
                    let fileEmbedItem = props.viewSettings.dataItem;
                    currentOrganizationName.value = fileEmbedItem.organization.name;
                    let validFrom = moment(fileEmbedItem.valid_from);
                    let validTo = moment(fileEmbedItem.valid_to);
                    validDateModel.value = [validFrom.format("YYYY-MM-DD HH:mm:ss"), validTo.format("YYYY-MM-DD HH:mm:ss")];
                    itemModel.value = {
                        organizationId: fileEmbedItem.organization.id,
                        validFrom: moment(validDateModel.value[0]).toDate(),
                        validTo: moment(validDateModel.value[1]).toDate(),
                    };
                }
            }
        });
        return {
            isLoading,
            currentOrganizationName,
            validDateModel,
            itemModel,
            addItemSubmit,
            onOrganizationChanged,
            moment,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
        ]),
    },
};
