<template>
    <component :is="componentType" class="page-button">
        <span class="text">
            <slot name="text">Button</slot>
        </span>
    </component>
</template>

<script lang="ts" setup>

import {computed, useAttrs} from "vue"

const attrs = useAttrs()

const componentType = computed(() => {
    if (attrs['href'] && (attrs['href'] as string).startsWith('http')) {
        return 'a'
    }

    if (attrs['to']) {
        return 'router-link'
    }

    return 'button'
})

</script>

<style lang="scss" scoped>

</style>
