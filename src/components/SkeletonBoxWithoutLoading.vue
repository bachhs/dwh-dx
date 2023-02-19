<template>
    <div>
        
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
const props = defineProps({
    maxWidth: { type: Number, required: false, default: 100 },
    minWidth: { type: Number, required: false, default: 80 },
    height: { type: String, required: false, default: `1em` },
    width: { type: String, required: false, default: null },
}); 
const computedWidth = computed(() => {
    return props.width || `${Math.floor((Math.random() * (props.maxWidth - props.minWidth)) + props.minWidth)}%`;
}); 
</script>

<style lang="css">
    .SkeletonBox {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        overflow: hidden;
        background-color: #dddbdd;
    }

    .SkeletonBox-rounded {
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
    }

    .SkeletonBox::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
        animation: shimmer 5s infinite;
        content: '';
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
</style>
