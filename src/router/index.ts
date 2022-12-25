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
            path: '/search',
            name: 'search',
            component: () => import('@/views/search/Index.vue'),
        },
        {
            path: '/data-source',
            name: 'dataSource',
            component: () => import('@/views/dataSource/Index.vue'),
        },
        // {
        //   path: "/datasource-pipeline",
        //   name: "datasourcePipeline",
        //   component: () => import("@/views/datasourcePipeline/Index.vue"),
        // },
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
    ],
});
export default router;
