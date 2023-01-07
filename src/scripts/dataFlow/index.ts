export default {
    setup() {
        const load = () => {
            const iframe: Document =
                window.frames['nifi-iframe'].contentWindow.document;
            if (!iframe) return;

            iframe.getElementById('header')?.remove();
            const canvasContainer = iframe.getElementById('canvas-container');
            if (!canvasContainer) return;
            canvasContainer.style.position = 'static';
        };
        return { load };
    },
};
