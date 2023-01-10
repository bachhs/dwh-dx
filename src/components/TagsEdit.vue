<template>
    <div>
        <!-- <el-input v-if="inputVisible" 
            ref="InputRef" 
            v-model="inputValue" 
            class="ml-1 w-20" 
            style="width: 8rem;" size="small"
            @keyup.enter="handleInputConfirm" 
            @blur="handleInputConfirm" /> -->            
        <div class="d-inline-block mr-1" v-if="inputVisible">
            <el-select v-model="inputValue" class="mr-2" placeholder="Chọn tag.." 
                style="width: 120px;"
                size="small">
                <el-option v-for="item in tagListSelections"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
            <el-button class="button-new-tag ml-0" 
                size="small" type="primary"
                @click="handleInputConfirm">
                <el-icon><Check /></el-icon>
            </el-button>
            <el-button class="button-new-tag ml-1" 
                size="small"
                @click="handleDone">
                <el-icon><Close /></el-icon>
            </el-button>
        </div>
        <el-button v-else class="button-new-tag ml-1" 
            size="small" 
            @click="showInput">
            + Thêm
        </el-button>
        <el-tag v-for="tag in tagList" :key="tag" class="mx-1 mb-0" 
            style="top: 1px;"
            closable 
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{ tag }}
        </el-tag>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    //import { ElInput } from 'element-plus';
    import { tagApi } from '@/api/tagApi';
    const props = defineProps({
        modelValue: { type: Array<String>, required: false, default: [] }
    });
    const emit = defineEmits(['submitTags']);

    const tagList = ref<Array<String>>(props.modelValue);
    watch(() => props.modelValue, (newVal) =>{
        tagList.value = JSON.parse(JSON.stringify(newVal));
    });

    const tagListSelections = ref<Array<String>>([]);
    const fetchTagList = async () => {
        const res = await tagApi.tagList();
        let selections = res.data.data
            .map((x) => x.children?.map((y) => y.fullyQualifiedName))
            .filter((x) => x)
            .flat();
        
        tagListSelections.value = selections.filter((tItem) => {
            console.log(`tItem ${tItem}`);
            if(tagList.value) return tagList.value.indexOf(tItem) < 0;
            else return false;
        });
    };

    const inputValue = ref('');
    const inputVisible = ref(false);
    //const InputRef = ref<InstanceType<typeof ElInput>>();

    const handleClose = (tag:String) => {
        tagList.value.splice(tagList.value.indexOf(tag), 1);
    }

    const showInput = () => {
        fetchTagList();
        inputVisible.value = true
        //nextTick(() => {
        //    //InputRef.value!.input!.focus()
        //})
    }

    const handleInputConfirm = () => {
        if (inputValue.value) {
            tagList.value.push(inputValue.value);
            const indexRemove = tagListSelections.value.indexOf(inputValue.value);
            if (indexRemove > -1) tagListSelections.value.splice(indexRemove, 1);
        }
        //inputVisible.value = false
        inputValue.value = ''
    }

    const handleDone = () => {
        inputVisible.value = false;
        emit("submitTags", tagList.value);
    };
</script>