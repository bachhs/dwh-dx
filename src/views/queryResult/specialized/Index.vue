
import type { Share } from '@element-plus/icons-vue';

<script lang="ts" src="@/scripts/queryResult/specialized/index.ts"></script>
<template>
    <el-card
        class="box-card w-100 d-flex flex-fill flex-column"
        :body-style="{ padding: '0.8rem 1rem' }">
        <component :is="currentView" :ItemSelected="ItemSelected"
            @changeView="(viewData:any) => { currentView = viewData.name; ItemSelected = viewData.data }" />
    </el-card>
</template>