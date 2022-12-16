<script lang="ts" src="@/scripts/datasourcePipeline/datasourcePipeline.ts">
    
</script>
<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.8rem 1rem' }">
        <component :is="currentComponent" @onChangeView="changeView" :viewSettings="viewSettings"></component>
    </el-card>
</template>