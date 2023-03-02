import { ref, onMounted, defineAsyncComponent } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory'; 
import moment from 'moment'; 
import SkeletonBox from '@/components/SkeletonBox.vue';
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    components: {
        EditCategory: defineAsyncComponent({
            loader: () =>
                import('@/views/baseTools/categoriesManager/_crudComponents/EditCategory.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup(props: any, context: any) {
        const isLoading = ref(false); 
        const editFields = ref([
            { key: "name", label: "Tên Tỉnh/Thành phố" },
            { key: "full_name", label: "Tên Tỉnh/Thành phố dạng đầy đủ" }
        ]);  
        const itemModel = ref<any>({
             countryId: 1
        });  
        
        const addItemSubmit = () => {
            isLoading.value = true;
            try {
                const data = {
                    
                }; 
                console.log('itemModel', itemModel.value);
                isLoading.value = false;
            } catch (err) {
                console.log(err);
                isLoading.value = false;
            }
        }; 
        
        onMounted(() => {
            if (props.viewSettings) {
                if(props.viewSettings.dataItem === null){ 
                    itemModel.value = { 
                    };
                }
                else{   
                    itemModel.value = { 
                    };
                }
            }
        });
        return {
            isLoading, 
            editFields,
            itemModel,
            addItemSubmit, 
            moment,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
        ]),
    },
};
