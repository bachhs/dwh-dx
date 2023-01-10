<template>    
    <div>
        <div class="mb-2 d-flex align-items-center">
            <div class="flex-fill pl-1">
                <!-- <el-radio-group v-model="activityFilter">
                    <el-radio-button label="All Activity" />
                    <el-radio-button label="Mentions" />
                </el-radio-group> -->
            </div>
            <div class="pr-4">
                <el-button @click="getFeedData">
                    <el-icon class="mr-1"><Refresh /></el-icon>
                    Refresh
                </el-button>
            </div>
        </div>
        <el-scrollbar :style="`height: ${contentHeight};`">
            <div class="mr-3 pl-1 pt-2">
                <div v-if="activityFeeds.length === 0"
                    class="flex-fill d-flex flex-column"
                    :style="`height: ${contentNodataWithFilterHeight};`">
                    <no-data />
                </div>
                <div v-else>
                    <!-- <el-card v-for="activityFeed in activityFeeds"
                        :key="activityFeed.id"
                        class="mb-2">
                        <div class="d-flex">
                            <div>{{ activityFeed.createdBy }}</div>
                        </div>
                        {{ activityFeed }}
                    </el-card> -->
                    <div class="timeline m-0">
                        <div v-for="activityFeed in activityFeeds" :key="activityFeed.id">
                            <i class="fas fa-user bg-navy mt-1"></i>
                            <div class="timeline-item mr-0">
                                <span class="time"><i class="fas fa-clock"></i> {{$filters.prettyDateUnix(parseInt(activityFeed.updatedAt/1000))}}</span>
                                <h3 class="timeline-header">
                                    <div class="d-flex align-items-center">
                                        <strong>{{ activityFeed.createdBy }}</strong>
                                        <span class="d-flex align-items-center">
                                            <span>&nbsp;post on&nbsp;</span>
                                            <span class="d-flex align-items-center">
                                                <strong v-for="(brcItem, brcItemIndex) in activityFeed.aboutFeedList"
                                                    :key="brcItem">
                                                    {{brcItem}}
                                                    <el-icon style="top: 3px;"
                                                        v-if="brcItemIndex < activityFeed.aboutFeedList.length - 1"><ArrowRight />
                                                    </el-icon>
                                                </strong>
                                            </span>
                                        </span>
                                    </div>
                                </h3>
                                <div class="timeline-body">
                                    <div v-html="activityFeed.message"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { dataSourceApi } from '@/api/dataSourceApi';
const props = defineProps({
    viewSettings: { type: Object, required: true },
});
const dataSourceSelected = props.viewSettings.dataSourceItem;
const databaseSelected = props.viewSettings.databaseSelected;
const schemasSelected = props.viewSettings.schemasSelected;
const tableSelected = props.viewSettings.tableSelected;
const activityFilter = ref('All Activity');
const contentHeight = 'calc(100vh - 25.5rem)';
const contentNodataHeight = 'calc(100vh - 24rem)';
const contentNodataWithFilterHeight = 'calc(100vh - 28rem)';
const activityFeeds = ref([] as any[]);


const getAboutFeedGroup = (str:string) => {
  const array = [...str.matchAll(/<#E::([\w\W\s\S]+)>/g)];
  return array.map(m => m[1])[0].split("::").filter(function (element, index) {
    return index % 2 !== 0;
   });
}
const getFeedData = async () => {
    const res = await dataSourceApi.fetchActivityFeedData(
        dataSourceSelected.name, 
        databaseSelected.name, 
        schemasSelected.name, 
        tableSelected.name
    );
    activityFeeds.value = res.data.data.map((x:any) => {
        return {
            ...x,
            aboutFeedList : getAboutFeedGroup(x.about)
        };
    });
};


onMounted(() =>{
    getFeedData();
});
</script>