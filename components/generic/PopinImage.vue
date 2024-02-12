<template>
    <img ref="imgRef"
         :alt="$attrs.alt as (string | undefined)"
         :class="{'unloaded': !loaded}"
         :src="$attrs.src as (string | undefined)"
         class="popin-image"
         loading="lazy"
         @load="onLoad">
</template>

<script lang="ts" setup>

import {onMounted, ref, useAttrs} from "vue"

const loaded = ref(false)
const attrs = useAttrs()

const emit = defineEmits<{
    (event: 'loaded'): void
}>()

const imgRef = ref<HTMLImageElement | null>(null)

function onLoad() {
    loaded.value = true
    emit('loaded')
}

onMounted(() => {
    if (imgRef.value && imgRef.value.complete) {
        onLoad()
    }
})

</script>

<style lang="scss" scoped>

.popin-image {
  transition: opacity 0.4s;
  position: relative;
}

.unloaded {
  opacity: 0;
}

</style>
