<script lang="ts" src="@/scripts/search-engine">

</script>
<template>
    <div class="box-card p-1 w-100 flex-fill d-flex flex-column">
        <section class="row row-eq-height mt-0 flex-fill">
            <div class="col-2">
                <el-card class="h-100" :body-style="{ padding: '0.5rem 0.8rem' }">
                    <!-- <h5 class="mb-3 ml-2">
                        <i class="fas fa-search text-navy"></i> 
                        <strong>Công cụ tìm kiếm</strong>
                    </h5> -->
                    <Navigation />
                </el-card>
            </div>
            <div class="col-10">
                <el-card class="h-100" :body-style="{ padding: '0.5rem 0.8rem' }">
                    <IndexView/>
                </el-card>
            </div>
        </section>
    </div>
</template>