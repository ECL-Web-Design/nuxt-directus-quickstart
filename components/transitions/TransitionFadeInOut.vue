<template>
    <transition name="transition-fade">
        <slot></slot>
    </transition>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">

//careful as transition may be overridden by external transition declaration
.transition-fade {
  &-enter-active, &-leave-active {
    transition: opacity 0.3s;
  }

  &-enter-from, &-leave-to {
    opacity: 0;
  }
}

</style>
