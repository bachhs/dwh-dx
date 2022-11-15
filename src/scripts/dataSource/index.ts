import { ref, onMounted } from "vue";
import axios from "axios";

const BASE_URL = "http://14.225.11.182:8081/api/v1";

export default {
  setup() {
    const datasources = ref([]);
    const typeDataFormat = ref("");
    const filterQuery = ref("");
    const options = ref([
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
      },
      {
        value: "Option3",
        label: "Option3",
      },
      {
        value: "Option4",
        label: "Option4",
      },
      {
        value: "Option5",
        label: "Option5",
      },
    ]);

    async function getDataSources() {
      const response = await axios.get(`${BASE_URL}/datasources`, {
        params: { page: 1, limit: 20 },
      });
      datasources.value = response.data.content;
      console.log(datasources.value);
    }

    onMounted(() => {
      getDataSources();
    });

    return {
      datasources,
      getDataSources,
    };
  },
};
