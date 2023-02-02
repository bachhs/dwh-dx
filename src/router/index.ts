import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/dashboard/HomeView.vue'),
        },
        {
            path: '/notification',
            name: 'notification',
            component: () => import('@/views/notification/Index.vue'),
        },
        {
            path: '/search-engine',
            name: 'SearchEngine',
            component: () => import('@/views/search-engine/Index.vue'),
        },
        {
            path: '/data-source',
            name: 'dataSource',
            component: () => import('@/views/dataSource/Index.vue'),
        },
        {
            path: '/file-upload',
            name: 'fileUpload',
            component: () => import('@/views/fileUpload/Index.vue'),
        },
        {
            path: '/file-embed-link',
            name: 'fileEmbedLink',
            component: () => import('@/views/fileEmbedLink/Index.vue'),
        },
        {
            path: '/tags-manager',
            name: 'tagManager',
            component: () => import('@/views/tag/index.vue'),
        },
        // {
        //   path: "/datasource-pipeline",
        //   name: "datasourcePipeline",
        //   component: () => import("@/views/datasourcePipeline/Index.vue"),
        // },
        {
            path: '/data-flow',
            name: 'dataFlow',
            component: () => import('@/views/dataFlow/Index.vue'),
        },
        {
            path: '/datasource-pipeline',
            name: 'datasourcePipeline',
            component: () =>
                import('@/views/datasourcePipeline/datasourcePipeline.vue'),
        },
        {
            path: '/datasource-processing',
            name: 'dataProcessing',
            component: () =>
                import('@/views/datasourcePipeline/dataProcessing.vue'),
        },
        {
            path: '/data-visualization',
            name: 'dataVisualization',
            component: () => import('@/views/dataVisualization/Index.vue'),
        },
        {
            path: '/report',
            name: 'report',
            component: () => import('@/views/report/Index.vue'),
        },
        {
            path: '/administration',
            name: 'administration',
            component: () => import('@/views/administration/Index.vue'),
        },
        {
            path: '/monitor',
            name: 'monitor',
            component: () => import('@/views/monitor/Index.vue'),
        },
        {
            path: '/support',
            name: 'support',
            component: () => import('@/views/support/Index.vue'),
        },
        {
            path: '/search-metadata',
            name: 'SearchMetaData',
            component: () => import('@/views/searchMetadata/Index.vue'),
        },
    ],
});
export default router;
