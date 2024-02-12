<template>
    <div v-if="show" class="builder-section-links">
        <page-button v-for="(link, index) in links" :key="index" :href="getHref(link.item)" :to="getTo(link.item)">
        </page-button>
    </div>
</template>

<script lang="ts" setup>

import {computed} from "vue"
import {ExternalLinkButton, InternalLinkButton} from "@/types/DirectusSchema.types"
import PageButton from "@/components/builder-fragments/PageButton.vue"

type Link =
    {
        item?: (Partial<InternalLinkButton & ExternalLinkButton> & {
            __typename: 'external_link_button' | 'internal_link_button' | string
        }) | null
    }
    | null

const props = defineProps<{
    links: Link[],
}>()

const show = computed(() => {
    return props.links && props.links.length > 0
})

function getTo(link: Link['item']) {
    if (link.__typename !== "internal_link_button") {
        return undefined
    }

    return link.route_link
}

function getHref(link: Link['item']) {
    if (link.__typename !== "external_link_button") {
        return undefined
    }

    return link.route_link
}

</script>

<style lang="scss" scoped>

</style>
