<!-- <script setup lang="ts">
  import AppLayoutDefault from '@/_layouts/AppLayoutDefault.vue'
  import NoNavLayout from '@/_layouts/NoNavLayout.vue'
  import { markRaw, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const layout = ref()
  const route = useRoute();

  watch(
    () => route.meta?.layout as string | undefined,
    async (metaLayout) => {
      try {
        if(route.name === 'fileEmbedLinkUpload') layout.value = markRaw(NoNavLayout);
        else{            
            const component = metaLayout && await import(/* @vite-ignore */ `./${metaLayout}.vue`)
            layout.value = markRaw(component?.default || AppLayoutDefault);  
            $(`[data-widget="treeview"]`).Treeview();
        }
      } catch (e) {
        console.error(e);
        layout.value = markRaw(AppLayoutDefault);
        $(`[data-widget="treeview"]`).Treeview();
      }
    },
    { immediate: true }
  )
</script>

<template>
  <component :is="layout"> <router-view /> </component>
</template> -->