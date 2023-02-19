import { createRouter, createWebHistory } from 'vue-router';
const categoryRoutes = [
    "position", "procedureIssue", "procedureType", "profileType", "province", "religion", 
    "wards", "citizen", "district", "enterprise", "linhVuc", "ethnic", "organization"
];
const beforeDigitization = ['dataStore', 'newDataIntegration'];
const digitizationState = ['pending', 'inprogress', 'wait-confirm', 'wait-accept', 'completed'];
const endrichDataRoutes = [ "workspace", "column-detail", "data-search", "data-set-details", "export-to-store", "export-to-store-schedule", 
//"make-quality", "quality", "distribution"
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/dashboard/HomeView.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        ...categoryRoutes.map(rItem => {
            return {
                path: `/category/${rItem.split(/(?=[A-Z])/).join('-').toLowerCase()}`,
                name: `${rItem}Cat`,
                component: () => import(`@/views/baseTools/categoriesManager/${rItem}/Index.vue`),
                meta: { layout: 'AppLayoutDefault' }
            }
        }),
        ...digitizationState.map(rItem => {
            return {
                path: `/digitization/${rItem}`,
                name: `digitization_${rItem}`,
                component: () => import(`@/views/digitization/${rItem}/Index.vue`),
                meta: { layout: 'AppLayoutDefault' }
            }
        }),
        ...beforeDigitization.map(rItem => {
            return {
                path: `/before-digitalization-store/${rItem.split(/(?=[A-Z])/).join('-').toLowerCase()}`,
                name: `beforeDigitization_${rItem}`,
                component: () => import(`@/views/beforeDigitization/${rItem}/Index.vue`),
                meta: { layout: 'AppLayoutDefault' }
            }
        }),
        ...endrichDataRoutes.map(rItem => {
            return {
                path: `/standardize-enrichment/${rItem.toLowerCase()}`,
                name: `enrichData_${rItem}`,
                component: () => import(`@/views/enrichData/${rItem}/Index.vue`),
                meta: { layout: 'AppLayoutDefault' }
            }
        }),
        {
            path: '/data-source-db/data-source',
            name: 'dataSource',
            component: () => import('@/views/dataSourceGroup/dataSource/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/data-source-file/file-server',
            name: 'fileServer',
            component: () => import('@/views/dataSourceGroup/fileServer/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/data-source-file/progress',
            name: 'datasourcePipelineFileServer',
            component: () => import('@/views/datasourcePipeline/fileServer/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/data-source-file/file-upload',
            name: 'fileUpload',
            component: () => import('@/views/dataSourceGroup/fileUpload/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/data-source-file/file-embed-link',
            name: 'fileEmbedLink',
            component: () => import('@/views/dataSourceGroup/fileEmbedLink/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/data-source-file/file-embed-link-upload/:id',
            name: 'fileEmbedLinkUpload',
            component: () => import('@/views/dataSourceGroup/fileEmbedLink/Upload.vue'),
            meta: { layout: 'NoNavLayout' }
        },
        {
            path: '/data-source-api/api-datasource',
            name: 'apiDatasource',
            component: () => import('@/views/dataSourceGroup/apiSource/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/data-source-api/progress',
            name: 'datasourcePipelineApi',
            component: () => import('@/views/datasourcePipeline/apiSource/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/tags-manager',
            name: 'tagManager',
            component: () => import('@/views/tag/index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        }, 
        {
            path: '/data-flow',
            name: 'dataFlow',
            component: () => import('@/views/dataFlow/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/data-source-db/progress',
            name: 'datasourcePipelineDataSet',
            component: () => import('@/views/datasourcePipeline/dataSet/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/data-visualization',
            name: 'dataVisualization',
            component: () => import('@/views/dataVisualization/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/report',
            name: 'report',
            component: () => import('@/views/report/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/administration',
            name: 'administration',
            component: () => import('@/views/administration/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/report/monitor',
            name: 'monitor',
            component: () => import('@/views/monitor/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/support',
            name: 'support',
            component: () => import('@/views/support/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/search-engine',
            name: 'SearchEngine',
            component: () => import('@/views/search-engine/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/search-metadata',
            name: 'SearchMetaData',
            component: () => import('@/views/searchMetadata/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/search-file',
            name: 'SearchFile',
            component: () => import('@/views/searchFile/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/query-result/all',
            name: 'QueryResultAll',
            component: () => import('@/views/queryResult/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },
        {
            path: '/query-result/specialized',
            name: 'QueryResultSpecialized',
            component: () => import('@/views/queryResult/specialized/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },        
        {
            path: '/shared/api-share-data',
            name: 'apiShareData',
            component: () => import('@/views/sharedApi/Index.vue'),
            meta: { layout: 'AppLayoutDefault' }
        },        
        {
            path: '/:pathMatch(.*)*',
            name: 'underConstruction',
            component: () => import('@/views/_errorDefault/Developing.vue'),
            meta: { layout: 'AppLayoutDefault' }
        }
    ],
});
export default router;
