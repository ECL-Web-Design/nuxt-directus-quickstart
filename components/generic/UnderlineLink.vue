<template>
    <a v-if="external" :href="$attrs.href as (string | undefined)" class="underline-link" target="_blank">
        <slot></slot>
    </a>
    <router-link v-else :to="$attrs?.to ?? ''" class="underline-link">
        <slot></slot>
    </router-link>
</template>

<script lang="ts" setup>

const props = defineProps<{
    external?: boolean,
}>()

</script>

<style lang="scss" scoped>

.underline-link {

  color: var(--fg-color);
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s;

  &:hover {
    border-color: var(--strong-bg);
  }
}

</style>
