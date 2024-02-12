<template>
    <div class="builder-cta-section">
        <h2 class="cta-title">{{ builderData?.title ?? '' }}</h2>
        <!-- @vue-ignore -->
        <builder-section-links :links="builderData.links"></builder-section-links>
    </div>
</template>

<script lang="ts" setup>

import BuilderSectionLinks from "@/components/builder-fragments/BuilderSectionLinks.vue"
import {BuilderCtaSection} from "@/types/DirectusSchema.types"

const props = defineProps<{
    builderData: Partial<BuilderCtaSection>,
}>()

</script>

<style lang="scss" scoped>

.builder-cta-section {
  padding-bottom: 5rem;
}

.cta-title {
  text-align: center;
}

.builder-section-links {
  display: flex;
  margin-top: 2rem;
  justify-content: center;
}

</style>
