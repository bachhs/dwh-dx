
import type { Share } from '@element-plus/icons-vue';

<script lang="ts" src="@/scripts/enrichData/workspace/index.ts"></script>
<template>
    <el-card
        class="box-card w-100 d-flex flex-fill flex-column"
        :body-style="{ padding: '0.8rem 1rem' }">
        <component :is="currentView" @changeView="(viewData:any) => { currentView = viewData.name }" />
    </el-card>
</template>