<template>
    <div class="SkeletonBox-rounded d-flex justify-center align-center flex-column align-self-center "
         style="background-color: #fff; width: 30rem; height: 20rem; justify-self: center;margin: auto;">
        <div class="d-flex justify-center align-center flex-column">
            <div class="position-relative d-flex">
                <img src="/static/image/rolling-loading-SkeletonBox.svg" 
                     class="m-auto"
                     style="width: 6rem;" />
            </div>
            <div class="text-center p-3">
                <h5 class="text-info">
                    {{randomMessage}}
                </h5>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "SkeletonBox",
        props: {
            maxWidth: {
                default: 100,
                type: Number,
            },
            minWidth: {
                default: 80,
                type: Number,
            },
            height: {
                default: `1em`,
                type: String,
            },
            width: {
                default: null,
                type: String,
            },
        },
        data() {
            return {
                loadingMessage: [
                    "Please be patient, we're keep working...",
                    'How about this weather, eh?',
                    'Building a wall...',
                    'Running with scissors...',
                    'Work, work...',
                    'Patience! This is difficult, you know...',
                    "Please wait while the minions do their work",
                    "Grabbing extra minions",
                    "Doing the heavy lifting",
                    "We're working very Hard .... Really",
                    "Waking up the minions"
                ]
            };
        },
        computed: {
            computedWidth() {
                return this.width || `${Math.floor((Math.random() * (this.maxWidth - this.minWidth)) + this.minWidth)}%`;
            },
            randomMessage() {
                const randomElement = this.loadingMessage[Math.floor(Math.random() * this.loadingMessage.length)];
                return randomElement;
            }
        },
    };
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
