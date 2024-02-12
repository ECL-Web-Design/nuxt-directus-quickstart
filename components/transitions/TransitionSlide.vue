<template>
    <transition :name="transitionName" mode="out-in">
        <slot></slot>
    </transition>
</template>

<script lang="ts" setup>

import {computed} from "vue"

const props = defineProps<{
    vertical?: boolean,
    reverse?: boolean
}>()

const transitionName = computed(() => {

    let direction = props.vertical ? 'vertical' : 'horizontal'
    let reverse = props.reverse ? '-reverse' : ''

    return `transition-slide-${direction}${reverse}`
})

</script>

<style lang="scss" scoped>

.transition-slide-horizontal, .transition-slide-horizontal-reverse, .transition-slide-vertical, .transition-slide-vertical-reverse {
  &-enter-from, &-leave-to {
    opacity: 0;
  }

  &-enter-active, &-leave-active {
    transition: translate 0.4s, opacity 0.2s;
  }
}

.transition-slide-horizontal {

  &-enter-from {
    translate: 100% 0;
  }

  &-leave-to {
    translate: -100% 0;
  }
}

.transition-slide-horizontal-reverse {

  &-enter-from {
    translate: -100% 0;
  }

  &-leave-to {
    translate: 100% 0;
  }
}

.transition-slide-vertical {

  &-enter-from {
    translate: 0 -100%;
  }

  &-leave-to {
    translate: 0 100%;
  }
}

.transition-slide-vertical-reverse {

  &-enter-from {
    translate: 0 100%;
  }

  &-leave-to {
    translate: 0 -100%;
  }
}

</style>
