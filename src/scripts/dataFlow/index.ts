export default {
    setup() {
        const load = () => {
            const iframe =
                document.getElementById('nifi-iframe')?.ownerDocument;
        };

        return { load };
    },
};
