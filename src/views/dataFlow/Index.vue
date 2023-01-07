<script lang="ts" src="@/scripts/dataFlow"></script>
<template>
    <iframe
        id="nifi-iframe"
        src="https://nifi.dtcsolution.vn/nifi/"
        height="100%"
        frameborder="0"
        v-on:load="load"></iframe>
</template>
