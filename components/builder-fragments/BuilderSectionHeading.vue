<template>
    <div class="builder-section-heading">
        <span class="section-subtitle">{{ headingContent?.subtitle }}</span>
        <h2 :id="headingContent?.header_anchor_tag ?? ''" class="section-title">
            <slot name="headerImg"></slot>
            <feature-text :featured-words="headingContent?.title?.highlighted_words" :gradient-text="featureUseGradient"
                          :text="headingContent?.title?.title ?? ''"></feature-text>
        </h2>
    </div>
</template>

<script lang="ts" setup>

import FeatureText from "@/components/generic/FeatureText.vue"
import {BuilderSectionBase} from "@/types/DirectusSchema.types"

const props = defineProps<{
    headingContent?: Partial<BuilderSectionBase>,
    featureUseGradient?: boolean,
}>()
</script>

<style lang="scss" scoped>

.section-title {
  font-family: Montserrat, sans-serif;
  margin: 0.5rem 0;
  font-weight: 100;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  scroll-margin-top: var(--header-offset);
}

.section-subtitle {

}

</style>
