<template :key="parsedIconName">
    <span class="material-icon-symbol">
        <transition-fade-in-out>
            <client-only>
                <icon v-if="iconData"
                      :class="[`icon-${parsedIconName}`]"
                      :icon="iconData"
                      inline></icon>
            </client-only>
        </transition-fade-in-out>
    </span>
</template>

<script lang="ts" setup>

import {Icon, IconifyIcon} from "@iconify/vue"
import {computed, ref, watchEffect} from "vue"
import TransitionFadeInOut from "~/components/transitions/TransitionFadeInOut.vue"
import {useAsyncData, useRuntimeConfig} from "#app"

const props = defineProps<{
    iconName?: string,
    rounded?: boolean,
    sharp?: boolean,
    filled?: boolean
}>()

const parsedIconName = computed(() => {
    if (!props.iconName) {
        return ''
    }

    const styleAdd = props.rounded ? '-rounded' : props.sharp ? '-sharp' : ''
    const filledAdd = !props.filled ? '-outline' : ''

    return props.iconName.replace(/_/g, '-').toLowerCase() + filledAdd + styleAdd
})

const {iconsUrl} = useRuntimeConfig().public

async function fetchIcon(name: string): Promise<null | IconifyIcon> {
    return (await fetch(`${iconsUrl}/material-symbols/${name}`)).json()
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

.material-icon-symbol {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 1em;
  height: 1em;
}

</style>
