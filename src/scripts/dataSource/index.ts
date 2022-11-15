import { reactive, ref } from "vue";
import axios from "axios";

const BASE_URL = "http://14.225.11.182:8081/api/v1";

export default {
  setup() {
    const data = reactive({
      datasources: ref([]),
      typeDataFormat: ref(""),
      filterQuery: ref(""),
      options: [
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
      ],
    });
    return data;
  },
  methods: {
    async getAllDataSources() {
      const response = await axios.get(`${BASE_URL}/datasources`, {
        params: { page: 1, limit: 20 },
      });
      this.datasources = response.data.content;
    },
  },
  mounted() {
    this.getAllDataSources();
  },
};
