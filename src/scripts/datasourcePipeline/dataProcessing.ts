import { reactive } from 'vue';
export default {
    setup() {
        const data = reactive({
            test: 1,
        });
        return data;
    },
};
