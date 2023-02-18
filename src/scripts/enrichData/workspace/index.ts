import { ref } from 'vue';
export default {
    setup() {
        const workspaceGroup = ref("myworkspace");
        const workspaceItems = ref([""]);
        return {
            workspaceGroup,
            workspaceItems
        };
    },
};
