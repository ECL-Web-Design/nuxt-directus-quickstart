<template>
    <div class="page-not-found">
        <h2 class="title">Sorry that page doesn't exist :(</h2>
        <p>{{ error.message }}</p>
    </div>
</template>

<script lang="ts" setup>

import {NuxtError} from "#app"

const props = defineProps<{
    error: NuxtError,
}>()

</script>

<style lang="scss" scoped>

.page-not-found {
  display: flex;
  justify-content: center;
  min-height: 80vh;
  align-items: center;
  box-sizing: border-box;
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.title {
  text-align: center;
}

</style>
