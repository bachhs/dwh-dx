<script lang="ts" src="@/scripts/dataSourceGroup/dataSource/index.ts"></script>
<template>
    <el-card
        class="box-card w-100 d-flex flex-fill flex-column"
        v-loading="isChangeViewLoading"
        :body-style="{ padding: '0.8rem 0.1rem 0.8rem 1rem' }"
    >
        <component
            :is="currentComponent"
            @onChangeView="changeView"
            :viewSettings="viewSettings"
        ></component>
        <!-- <ListData/> -->
    </el-card>
</template>
