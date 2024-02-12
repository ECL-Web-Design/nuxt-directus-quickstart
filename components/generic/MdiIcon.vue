<template :key="parsedIconName">
    <span class="mdi-icon">
            <client-only>
                <icon v-if="iconData"
                      :class="[`icon-${parsedIconName}`]"
                      :icon="iconData"
                      inline></icon>
            </client-only>
    </span>
</template>

<script lang="ts" setup>

import {Icon, IconifyIcon} from "@iconify/vue"
import {computed, ref, watchEffect} from "vue"
import {useAsyncData, useRuntimeConfig} from "#app"

const props = defineProps<{
    iconName?: string
}>()

const parsedIconName = computed(() => {
    if (!props.iconName) {
        return ''
    }

    return props.iconName.replace(/_/g, '-').toLowerCase()
})

const {iconsUrl} = useRuntimeConfig().public

async function fetchIcon(name: string): Promise<null | IconifyIcon> {
    return (await fetch(`${iconsUrl}/mdi/${name}`)).json()
}

const iconData = ref<IconifyIcon | null>(null)

watchEffect(async () => {
    const {data} = await useAsyncData(
        parsedIconName.value,
        () => fetchIcon(parsedIconName.value)
    )

    iconData.value = data.value
})

</script>

<style lang="scss" scoped>

.mdi-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 1em;
  height: 1em;
}

</style>
