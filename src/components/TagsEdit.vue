<template>
    <div>
        <el-input v-if="inputVisible" 
            ref="InputRef" 
            v-model="inputValue" 
            class="ml-1 w-20" 
            style="width: 8rem;" size="small"
            @keyup.enter="handleInputConfirm" 
            @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag ml-1" 
            size="small" 
            @click="showInput">
            + Thêm
        </el-button>
        <el-tag v-for="tag in tagList" :key="tag" class="mx-1 mb-0" 
            closable 
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{ tag }}
        </el-tag>
    </div>
</template>

<script lang="ts" setup>
    import { ref, nextTick, watch } from 'vue';
    import { ElInput } from 'element-plus';
    const props = defineProps({
        modelValue: { type: Array<String>, required: false, default: [] }
    });
    const tagList = ref<Array<String>>(props.modelValue);
    watch(() => props.modelValue, (newVal) =>{
        tagList.value = JSON.parse(JSON.stringify(newVal));
    });
    const inputValue = ref('');
    const inputVisible = ref(false);
    const InputRef = ref<InstanceType<typeof ElInput>>();

    const handleClose = (tag:String) => {
        tagList.value.splice(tagList.value.indexOf(tag), 1)
    }

    const showInput = () => {
        inputVisible.value = true
        nextTick(() => {
            InputRef.value!.input!.focus()
        })
    }

    const handleInputConfirm = () => {
        if (inputValue.value) {
            tagList.value.push(inputValue.value)
        }
        inputVisible.value = false
        inputValue.value = ''
    }
</script>