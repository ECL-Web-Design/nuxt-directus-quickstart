<template>
    <ul class="item-list">
        <li v-for="(item, index) in items" :key="index">
            <slot name="item" v-bind="{item: item, itemIndex: index}"></slot>
        </li>
    </ul>
</template>

<script generic="T" lang="ts" setup>

const props = defineProps<{
    items: T[],
}>()

</script>

<style lang="scss" scoped>

.item-list {
  list-style: none;
  padding: 0;
}

</style>
