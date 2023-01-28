<template>
    <div>
        <div class="d-flex align-items-center">
            <div class="flex-fill">
                <h4 class="mb-1 ml-2">
                    <i class="fas fa-indent text-primary"></i>
                    <strong class="ml-2">Chỉ mục</strong>
                </h4>
            </div>
            <div>
                <el-dropdown trigger="click">
                    <div class="el-dropdown-link">
                        <div class="text-muted mb-1"><small>Application</small></div>
                        <div class="d-flex flex-row align-items-center">
                            <img style="height: 18px;"
                                src="https://www.citypng.com/public/uploads/small/31631799232q74jw0cko5c1uvgpelqzssgha5zfscvnjre0b6hslsfb9egnfnsqgwghla9bsd25hbxbey6rd4n3gjtdlurikyskupiincxhuqit.png" />
                            <span class="ml-1">DTC SOLUTIONS 1</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </div>
                    </div>
                    <template #dropdown>
                        <div class="p-3" style="width: 25rem;">
                            <el-input v-model="input1" class="w-100" size="large" placeholder="Search application.." :prefix-icon="Search" />
                            <div class="mt-3">
                                <div v-for="item in 5" :key="item" class="card p-2 pl-3 pr-3 d-flex flex-row align-items-center">
                                    <div class="item-icon">
                                        <img style="width: 40px;"
                                            src="https://www.citypng.com/public/uploads/small/31631799232q74jw0cko5c1uvgpelqzssgha5zfscvnjre0b6hslsfb9egnfnsqgwghla9bsd25hbxbey6rd4n3gjtdlurikyskupiincxhuqit.png" />
                                    </div>
                                    <div class="flex-fill ml-2">
                                        <div class="text-navy"><strong>DTC SOLUTIONS {{item}}</strong></div>
                                        <div>
                                            <span style="font-size: 90%;" class="text-muted">
                                                <span class="stl-uppercase">4X7445ASX3</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="label bg-gradient-navy">Current</span>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div class="d-flex">
                                <div class="flex-fill">
                                    <el-button type="primary" class="w-100">
                                        <el-icon><Plus /></el-icon>
                                        <span>Create application</span>
                                    </el-button>
                                </div>
                                <div class="ml-2">
                                    <el-button class="w-100">
                                        <span>See all</span>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                        <!-- <el-dropdown-menu>
                            <el-dropdown-item>DTC SOLUTIONS 1</el-dropdown-item>
                            <el-dropdown-item>DTC SOLUTIONS 2</el-dropdown-item>
                            <el-dropdown-item>DTC SOLUTIONS 3</el-dropdown-item>
                        </el-dropdown-menu> -->
                    </template>
                </el-dropdown>

                <el-dropdown class="ml-5" trigger="click">
                    <div class="el-dropdown-link">
                        <div class="text-muted mb-1"><small>Index</small></div>
                        <div class="d-flex flex-row align-items-center">
                            <i class="text-navy fas fa-hdd"></i>
                            <span class="ml-1">INDEX 1</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </div>
                    </div>
                    <template #dropdown>
                        <div class="p-3" style="width: 25rem;">
                            <el-input v-model="input1" class="w-100" size="large" placeholder="Search index.." :prefix-icon="Search" />
                            <div class="mt-3">
                                <div v-for="item in 5" :key="item" class="card p-2 pl-3 pr-3 d-flex flex-row align-items-center">
                                    <div class="item-icon">
                                        <i class="text-navy fas fa-3x fa-hdd"></i>
                                    </div>
                                    <div class="flex-fill ml-2">
                                        <div class="text-navy"><strong>INDEX {{item}}</strong></div>
                                        <div>
                                            <span style="font-size: 90%;" class="text-muted">
                                                <span class="stl-uppercase">0 records</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="label bg-gradient-navy">Current</span>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div class="d-flex">
                                <div class="flex-fill">
                                    <el-button type="primary" class="w-100">
                                        <el-icon><Plus /></el-icon>
                                        <span>Create index</span>
                                    </el-button>
                                </div>
                                <div class="ml-2">
                                    <el-button class="w-100">
                                        <span>See all</span>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                        <!-- <el-dropdown-menu>
                            <el-dropdown-item>DTC SOLUTIONS 1</el-dropdown-item>
                            <el-dropdown-item>DTC SOLUTIONS 2</el-dropdown-item>
                            <el-dropdown-item>DTC SOLUTIONS 3</el-dropdown-item>
                        </el-dropdown-menu> -->
                    </template>
                </el-dropdown>
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <div>
            <span>No. records</span>
            <span class="ml-2">0</span>
            <span class="ml-3">avg. record size</span>
            <span class="ml-2">0B</span>
        </div>
        <div class="mt-3">
            <el-select placeholder="New...">
                <el-option label="Index" value="Index" />
                <el-option label="Replica" value="Replica" />
            </el-select>

            <el-select class="ml-2" placeholder="Add records...">
                <el-option label="Upload file" :value="1" />
                <el-option label="Use the API" :value="2" />
                <el-option label="Add manually" :value="3" />
            </el-select>

            <el-select class="ml-2" placeholder="Manage index...">
                <el-option label="Upload file" :value="1" />
                <el-option label="Use the API" :value="2" />
                <el-option label="Add manually" :value="3" />
            </el-select>

            <el-button class="ml-2">
                <el-icon>
                    <CopyDocument />
                </el-icon>
            </el-button>
            <el-button class="ml-2">
                <el-icon>
                    <Refresh />
                </el-icon>
            </el-button>
        </div>
        <div class="mt-2">
            <el-tabs v-model="tabSelected">
                <el-tab-pane label="Browse" name="Browse">
                    <BrowserTab/>
                </el-tab-pane>
                <el-tab-pane label="Configuration" name="Configuration">
                    <ConfiguarationTab/>
                </el-tab-pane>
                <el-tab-pane label="Replicas" name="Replicas">Replicas</el-tab-pane>
                <el-tab-pane label="Search API Logs" name="SearchAPILogs">Search API Logs</el-tab-pane>
                <el-tab-pane label="Stats" name="Stats">Stats</el-tab-pane>
                <el-tab-pane label="UI Demos" name="UIDemos">UI Demos</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts"> 
    import { ref, defineAsyncComponent } from "vue";
    import SkeletonBox from '@/components/SkeletonBox.vue';
    import { Search } from '@element-plus/icons-vue';
    const BrowserTab = defineAsyncComponent({
        loader: () => import('@/views/search-engine/components/indexTabs/BrowserTab.vue'),
        loadingComponent: SkeletonBox,
    });
    const ConfiguarationTab = defineAsyncComponent({
        loader: () => import('@/views/search-engine/components/indexTabs/ConfiguarationTab.vue'),
        loadingComponent: SkeletonBox,
    });
    const tabSelected = ref('Browse');
</script>