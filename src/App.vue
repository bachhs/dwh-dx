<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '@/_layouts/AppLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
  }
})
</script>

<template>
    <RouterView />
</template>
