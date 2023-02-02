import { ref, onMounted } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { fileUploadApi } from '@/api/fileUploadApi';
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup(props: any, context: any) {
        const isLoading = ref(false);
        const itemModel = ref({
            nameOfDS: '',
            descOfDS: '',
        }); 

        const addItemSubmit = () => {
            isLoading.value = true;
            try {
                const data = {
                    name: itemModel.value.nameOfDS,
                    description: itemModel.value.descOfDS,
                };
            } catch (err) {
                console.log(err);
                isLoading.value = false;
            }
        };

        onMounted(() => {
            if (props.viewSettings) {
                const orgId =  appState.defaultOrganization.id;
                const orgName =  appState.defaultOrganization.name;
                itemModel.value = {
                    nameOfDS: '',
                    descOfDS: '',
                };
            }
        });
        return {
            isLoading,
            itemModel,
            addItemSubmit,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
        ]),
    },
};
