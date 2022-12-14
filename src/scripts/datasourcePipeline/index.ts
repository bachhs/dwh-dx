import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const pipelines = ref(new Array<any>([]));

    async function getPipelines(): Promise<void> {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/pipelines`,
        {
          params: { page: 1, limit: 20 },
        }
      );
      pipelines.value = response.data.content;
    }

    onMounted(() => {
      getPipelines();
    });

    return {
      pipelines,
      getPipelines,
    };
  },
};
