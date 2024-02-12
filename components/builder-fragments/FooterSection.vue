<template>
    <nav class="footer-section">
        <span class="footer-section-header">{{ content?.heading ?? '' }}</span>
        <ol class="route-list">
            <li v-for="(route, index) in pageLinks" :key="index">
                <underline-link :to="route?.parsed_route" class="page-link">{{
                        route?.navbar_label ?? 'INVALID'
                    }}
                </underline-link>
            </li>
        </ol>
    </nav>
</template>

<script lang="ts" setup>

import UnderlineLink from "@/components/generic/UnderlineLink.vue"
import {FooterSection, RouteItem} from "@/types/DirectusSchema.types"
import {computed} from "vue"

const props = defineProps<{
    content: Partial<FooterSection>,
}>()

const pageLinks = computed(() => {
    return (props.content.links ?? []) as RouteItem[]
})

</script>

<style lang="scss" scoped>

.footer-section {
  display: grid;
  grid-auto-rows: min-content;
}

.page-link {
  font-size: var(--font-small);
}

.route-list {
  display: grid;
  gap: 0.3rem;
}

.page-link {
  opacity: 0.7;
  transition: opacity 0.2s, border-color 0.2s;
  text-transform: capitalize;

  &:hover {
    opacity: 1;
  }
}

</style>
