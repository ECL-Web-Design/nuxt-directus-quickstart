<template>
    <div v-if="content" class="editorjs-renderer">
        <div v-for="(block, index) in parsedHtml" :key="index" class="block" v-html="block">
        </div>
    </div>
    <div v-else>
        No content
    </div>
</template>

<script lang="ts" setup>

import {computed} from "vue"

import edjsHtml from "editorjs-html"
import type {OutputData} from "@editorjs/editorjs"

const props = defineProps<{
    content?: OutputData
}>()

const parsedHtml = computed(() => {
    //@ts-ignore
    const edjsParser = edjsHtml()

    const parsed = edjsParser.parseStrict(props.content)

    if (parsed instanceof Error) {
        return []
    }

    return parsed
})

</script>

<style lang="scss" scoped>

</style>
