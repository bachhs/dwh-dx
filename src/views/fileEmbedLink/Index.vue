<script lang="ts" src="@/scripts/fileEmbedLink/index.ts"></script>
<template>
    <el-card class="box-card w-100 flex-fill"
        v-loading="isChangeViewLoading"
		:body-style="{ padding: '0.5rem 0.8rem' }">
        <component
            :is="currentComponent"
            @onChangeView="changeView"
            :viewSettings="viewSettings"
        ></component>
    </el-card>
</template>