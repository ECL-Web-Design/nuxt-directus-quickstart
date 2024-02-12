<template>
    <main class="page-wrapper-default">
        <page-navbar :nav-routes="navRoutes"></page-navbar>
        <div class="page-content">
            <slot></slot>
        </div>
        <page-footer></page-footer>
    </main>
</template>

<script lang="ts" setup>

import PageNavbar from "~/layouts/fragments/PageNavbar.vue"
import PageFooter from "~/layouts/fragments/PageFooter.vue"
import useNavbarLinks from "~/composables/useNavbarLinks"

const navRoutes = useNavbarLinks()
</script>

<style scoped>

.page-content {
    max-width: var(--content-max-width);
    margin: 0 auto;
    min-height: 80vh;
    box-sizing: border-box;
    padding: var(--section-top-padding) var(--page-margin);
}

</style>
