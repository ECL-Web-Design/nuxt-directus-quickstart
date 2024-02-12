<template>
    <component :is="componentType" class="site-logo-name" to="/">
        <img :src="imageSrc" alt="Site Logo" class="site-logo">
        <span v-if="siteName" class="site-name">{{ siteName }}</span>
    </component>
</template>

<script lang="ts" setup>

import {computed} from "vue"
import {NuxtLink} from "#components"

const props = defineProps<{
    siteName: string,
    siteLogoSrc: string,
    isHomeLink?: boolean
}>()

const componentType = computed(() => {
    return props.isHomeLink ? NuxtLink : 'div'
})

const imageSrc = computed(() => {
    return props.siteLogoSrc || '/default-logo.svg'
})


</script>

<style lang="scss" scoped>

.site-logo-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.site-logo {
  height: 1em;
  min-height: 40px;
  width: auto;
}

</style>
