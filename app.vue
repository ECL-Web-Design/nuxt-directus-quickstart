<template>
    <!-- Favicon Settings - paste from realfavicongenerator
     Make sure to capitalize Tag names (eg. Link not link) so they are Nuxt components and not raw html tags -->

    <Link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180"></Link>
    <Link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"></Link>
    <Link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"></Link>
    <Link href="/site.webmanifest" rel="manifest"></Link>
    <Link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon"></Link>
    <Meta content="#00aba9" name="msapplication-TileColor"></Meta>
    <Meta content="#ffffff" name="theme-color"></Meta>

    <!-- Favicon Settings End   -->

    <nuxt-layout name="page-wrapper-default">
        <nuxt-page :page-key="currentRoute.fullPath"></nuxt-page>
    </nuxt-layout>
</template>

<script lang="ts" setup>

import usePrivateDirectusClient from "~/composables/usePrivateDirectusClient"
import {callOnce} from "#app"
import {Link, Meta, NuxtLayout, NuxtPage} from "#components"
import fetchSiteSettings from "~/utils/directus/DirectusFetchSettings"
import fetchContacts from "~/utils/directus/DirectusFetchContact"
import {useSiteSettingsSetter} from "~/composables/useSiteSettings"
import {computed, ref} from "vue"
import srcConstruct from "~/utils/directus/DirectusSrcConstruct"
import directusFetchRoutes from "~/utils/directus/DirectusFetchRoutes"
import {useRouter} from "vue-router"

const siteSettings = useSiteSettingsSetter()

const {currentRoute} = useRouter()

await callOnce(async () => {
    const directusSDK = usePrivateDirectusClient()
    const settings = await fetchSiteSettings(directusSDK)
    const contactData = await fetchContacts(directusSDK)
    const routes = await directusFetchRoutes(directusSDK)

    siteSettings.value = {
        siteName:        ref(settings?.site_name ?? null),
        globalMetaTitle: ref(settings?.global_meta_title ?? null),
        socialLinks:     ref(settings?.social_links ?? null),
        contactData:     ref(contactData),
        logo:            ref(settings?.logo ?? null),
        routes:          ref(routes.routes),
        homePage:        ref(routes.home_page),
        constructedLogo: computed(() => {
            return srcConstruct(settings?.logo)
        })
    }
})

</script>

<style lang="scss" scoped>


</style>
