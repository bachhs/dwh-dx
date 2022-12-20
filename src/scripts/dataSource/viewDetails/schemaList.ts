import axios from "axios";
import { onMounted, ref } from "vue";

export default {
    props: ["viewSettings"],
    emits: ["onChangeView"],
    setup(props: any) {
        const schemas = ref([]);
        const fetchSchemas = async (
            datasourceName: string,
            databaseName: string
        ) => {
            const res = await axios(
                `/meta/database_service/${datasourceName}/database/${databaseName}/schema`
            );

            schemas.value = res.data.data;
        };
        onMounted(() => {
            // hard code for now
            fetchSchemas("demo_app_26_10_23", "demo_app");
        });
        return {
            schemas,
        };
    },
};
