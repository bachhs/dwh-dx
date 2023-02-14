import { createRouter, createWebHistory } from 'vue-router';
const categoryRoutes = [
    "position", "procedureIssue", "procedureType", "profileType", "province", "religion", 
    "wards", "citizen", "district", "enterprise", "linhVuc", "nation", "organization"
];
const digitizationState = ['pending', 'inprogress', 'wait-confirm', 'wait-accept', 'completed']
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/dashboard/HomeView.vue'),
        },
        ...categoryRoutes.map(rItem => {
            return {
                path: `/category/${rItem.split(/(?=[A-Z])/).join('-').toLowerCase()}`,
                name: `${rItem}Cat`,
                component: () => import(`@/views/baseTools/categoriesManager/${rItem}/Index.vue`),
            }
        }),
        ...digitizationState.map(rItem => {
            return {
                path: `/digitization/${rItem}`,
                name: `digitization_${rItem}`,
                component: () => import(`@/views/digitization/${rItem}/Index.vue`),
            }
        }),
        {
            path: '/data-source-db/data-source',
            name: 'dataSource',
            component: () => import('@/views/dataSourceGroup/dataSource/Index.vue'),
        },
        {
            path: '/data-source-file/file-server',
            name: 'fileServer',
            component: () => import('@/views/dataSourceGroup/fileServer/Index.vue'),
        },
        {
            path: '/data-source-file/file-upload',
            name: 'fileUpload',
            component: () => import('@/views/dataSourceGroup/fileUpload/Index.vue'),
        },
        {
            path: '/data-source-file/file-embed-link',
            name: 'fileEmbedLink',
            component: () => import('@/views/dataSourceGroup/fileEmbedLink/Index.vue'),
        },
        {
            path: '/data-source-file/file-embed-link-upload/:id',
            name: 'fileEmbedLinkUpload',
            component: () => import('@/views/dataSourceGroup/fileEmbedLink/Upload.vue'),
        },
        {
            path: '/data-source-api/api-datasource',
            name: 'apiDatasource',
            component: () => import('@/views/dataSourceGroup/apiSource/Index.vue'),
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
            path: '/report/monitor',
            name: 'monitor',
            component: () => import('@/views/monitor/Index.vue'),
        },
        {
            path: '/support',
            name: 'support',
            component: () => import('@/views/support/Index.vue'),
        },
        {
            path: '/search-engine',
            name: 'SearchEngine',
            component: () => import('@/views/search-engine/Index.vue'),
        },
        {
            path: '/search-metadata',
            name: 'SearchMetaData',
            component: () => import('@/views/searchMetadata/Index.vue'),
        },
        {
            path: '/search-file',
            name: 'SearchFile',
            component: () => import('@/views/searchFile/Index.vue'),
        },
        {
            path: '/query-result/all',
            name: 'QueryResult',
            component: () => import('@/views/queryResult/Index.vue'),
        },
    ],
});
export default router;
