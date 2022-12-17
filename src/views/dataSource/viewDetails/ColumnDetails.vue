<script setup lang="ts">
// tab name: Profiler
</script>
<template>
    <div class="ml-1">
        <div class="row row-eq-height">
            <div class="col-12 col-sm-6 col-md-4 d-flex flex-column">
                <el-card
                    class="flex-fill"
                    :body-style="{ padding: '0.5rem 0.8rem' }"
                >
                    <div class="d-flex">
                        <div class="flex-fill">
                            <div>
                                <div><strong>Column summary</strong></div>
                                <div>
                                    <h4 class="text-primary mb-1">id</h4>
                                </div>
                            </div>
                            <div class="text-muted">
                                <div>
                                    <p>
                                        This page has been enhanced for
                                        printing.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div><strong>Data type</strong></div>
                            <div class="mt-2">
                                <h4 class="text-primary">BIGINT</h4>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="col-12 col-sm-6 col-md-4 d-flex flex-column">
                <el-card
                    class="flex-fill"
                    :body-style="{ padding: '0.5rem 0.8rem' }"
                >
                    <div>
                        <div><strong>Table Metrics Summary</strong></div>
                        <div class="d-flex mt-3 mb-2">
                            <div
                                class="flex-fill mr-3 pl-3 pt-1 text-center"
                                style="
                                    border: 1px solid #e0e0e0;
                                    border-radius: 8px;
                                    background-color: #f7f7f7;
                                "
                            >
                                <div>Row Count</div>
                                <div class="mt-1">
                                    <h4>1</h4>
                                </div>
                            </div>
                            <div
                                class="flex-fill mr-3 pl-3 pt-1 text-center"
                                style="
                                    border: 1px solid #e0e0e0;
                                    border-radius: 8px;
                                    background-color: #f7f7f7;
                                "
                            >
                                <div>Column Count</div>
                                <div class="mt-1">
                                    <h4>4</h4>
                                </div>
                            </div>
                            <div
                                class="flex-fill pl-3 pt-1 text-center"
                                style="
                                    border: 1px solid #e0e0e0;
                                    border-radius: 8px;
                                    background-color: #f7f7f7;
                                "
                            >
                                <div>Table Sample</div>
                                <div class="mt-1">
                                    <h4>100%</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="col-12 col-sm-6 col-md-4 d-flex flex-column">
                <el-card
                    class="flex-fill"
                    :body-style="{ padding: '0.5rem 0.8rem' }"
                >
                    <div>
                        <div><strong>Table Tests Summary</strong></div>
                        <div class="d-flex mt-3 mb-2">
                            <div
                                class="flex-fill mr-3 pl-3 pt-1 text-center"
                                style="
                                    border: 1px solid rgb(41 213 205);
                                    border-radius: 8px;
                                    background-color: rgb(196 255 225);
                                "
                            >
                                <div class="text-success">
                                    <strong>Success</strong>
                                </div>
                                <div class="mt-1 text-success">
                                    <h4>0</h4>
                                </div>
                            </div>
                            <div
                                class="flex-fill mr-3 pl-3 pt-1 text-center"
                                style="
                                    border: 1px solid rgb(253 178 67);
                                    border-radius: 8px;
                                    background-color: rgb(255 235 204);
                                "
                            >
                                <div class="text-orange">
                                    <strong>Aborted</strong>
                                </div>
                                <div class="mt-1 text-orange">
                                    <h4>0</h4>
                                </div>
                            </div>
                            <div
                                class="flex-fill pl-3 pt-1 text-center"
                                style="
                                    border: 1px solid rgb(255 155 155);
                                    border-radius: 8px;
                                    background-color: rgb(255 217 217);
                                "
                            >
                                <div class="text-danger">
                                    <strong>Failed</strong>
                                </div>
                                <div class="mt-1 text-danger">
                                    <h4>0</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="mt-3">
            <el-card
                class="flex-fill"
                :body-style="{ padding: '0.5rem 0.8rem' }"
            >
                <div class="d-flex">
                    <div>
                        <div>
                            <div>Distinct Count</div>
                            <div class="text-primary">
                                <h4>0</h4>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div>Null Count</div>
                            <div class="text-indigo">
                                <h4>0</h4>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div>Unique Count</div>
                            <div class="text-purple">
                                <h4>0</h4>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div>Values Count</div>
                            <div class="text-maroon">
                                <h4>0</h4>
                            </div>
                        </div>
                    </div>
                    <div class="flex-fill ml-3"></div>
                </div>
            </el-card>
        </div>

        <div class="mt-3">
            <el-card
                class="flex-fill"
                :body-style="{ padding: '0.5rem 0.8rem' }"
            >
                <div class="d-flex">
                    <div>
                        <div>
                            <div>Distinct Proportion</div>
                            <div class="text-primary">
                                <h4>0.00%</h4>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div>Null Proportion</div>
                            <div class="text-indigo">
                                <h4>0.00%</h4>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div>Unique Proportion</div>
                            <div class="text-purple">
                                <h4>0.00%</h4>
                            </div>
                        </div>
                    </div>
                    <div class="flex-fill ml-3"></div>
                </div>
            </el-card>
        </div>
    </div>
</template>
