<template>
    <section class="builder-generic-content-section">
        <builder-section-heading v-if="builderData.section_heading"
                                 :heading-content="builderData.section_heading ?? undefined"></builder-section-heading>
        <editorjs-renderer :content="builderData?.section_heading?.content"></editorjs-renderer>
    </section>
</template>

<script lang="ts" setup>
import BuilderSectionHeading from "@/components/builder-fragments/BuilderSectionHeading.vue"
import {GenericContentSection} from "@/types/DirectusSchema.types"
import EditorjsRenderer from "@/components/generic/EditorjsRenderer.vue"

const props = defineProps<{
    builderData: Partial<GenericContentSection>,
}>()
</script>

<style lang="scss" scoped>

</style>
