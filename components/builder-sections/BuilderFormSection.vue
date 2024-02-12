<template>
    <div class="builder-form-section">
        <div ref="headingRef">
            <builder-section-heading :heading-content="builderData.section_heading ?? undefined"
                                     feature-use-gradient></builder-section-heading>
        </div>
        <form-builder :form-data="builderData.form_item as FormBuilderData" post-url="">
            <template #loading>
                <div class="loading-panel">
                    <slot name="loading"></slot>
                </div>
            </template>
        </form-builder>
    </div>
</template>

<script lang="ts" setup>

import BuilderSectionHeading from "@/components/builder-fragments/BuilderSectionHeading.vue"
import type {FormBuilderData} from "@/types/Form.types"
import FormBuilder from "@/components/generic/FormBuilder.vue"
import {FormSection} from "@/types/DirectusSchema.types"
import {ref} from "vue"

const props = defineProps<{
    builderData: Partial<FormSection>,
}>()

const headingRef = ref<HTMLElement | null>(null)

</script>

<style lang="scss" scoped>

.loading-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.logo-spinner {
  width: 3rem;
  height: 3rem;
}

.builder-section-heading {
  padding-bottom: 5rem;
}

.builder-form-section {
  padding-bottom: var(--section-bottom-padding);
}

</style>
