<template>
    <div class="builder-page">
        <template v-if="pageSections.length > 0">
            <component :is="builderComponentMap[section.collection ?? 'notFound']"
                       v-for="(section, index) in pageSections"
                       :key="index"
                       :builder-data="section.item"
                       :class="{'page-top-section': index === 0}"
                       :dynamic-guid="dynamicGuid ?? undefined"
                       :guid="pageGuid"
                       class="builder-section">
            </component>
        </template>
        <template v-else>
            <default-builder-section></default-builder-section>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {setPageMeta} from "@/utils/PageMeta"
import BuilderFormSection from "~/components/builder-sections/BuilderFormSection.vue"
import BuilderCtaSection from "@/components/builder-sections/BuilderCtaSection.vue"
import {PageSections} from "~/types/DirectusSchema.types"
import DefaultBuilderSection from "@/components/builder-sections/DefaultBuilderSection.vue"
import BuilderGenericContentSection from "@/components/builder-sections/BuilderGenericContentSection.vue"
import {computed, DefineComponent, watchEffect} from "vue"
import {useRoute} from "vue-router"
import useSiteSettings from "~/composables/useSiteSettings"
import useFetchPage from "~/composables/useFetchPage"

const route = useRoute()

const pageGuid = computed<string>(() => {
    if (!route.meta.pageGuid) {
        return ''
    }

    return route.meta.pageGuid as string
})

const dynamicGuid = computed(() => {
    return route.meta.dynamicGuid ?? null as string | null
})

const {page: pageData} = await useFetchPage(pageGuid.value)

const builderComponentMap: { [key: string]: DefineComponent<{}, {}, any> } = {
    notFound:                DefaultBuilderSection,
    form_section:            BuilderFormSection,
    builder_cta_section:     BuilderCtaSection,
    generic_content_section: BuilderGenericContentSection
}

const pageSections = computed<PageSections[]>(() => {
    return (pageData.value?.sections ?? []) as PageSections[]
})

const {globalMetaTitle} = useSiteSettings()

watchEffect(() => {
    setPageMeta(pageData.value, globalMetaTitle.value)
})

</script>

<style lang="scss" scoped>

.builder-page {
  width: 100%;
  display: grid;
  gap: 8rem;
  box-sizing: border-box;
  max-width: var(--content-max-width);
}

</style>
