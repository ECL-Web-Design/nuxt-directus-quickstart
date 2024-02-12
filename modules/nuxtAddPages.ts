import {createResolver, defineNuxtModule, extendPages, Resolver} from "../node_modules/nuxt/kit"
import directusFetchRoutes from "../utils/directus/DirectusFetchRoutes"
import {createDirectusClient} from "../utils/directus/DirectusSdkClient"
import {NuxtPage} from "../node_modules/nuxt/schema"


async function addPagesFromCMS(pages: NuxtPage[], resolver: Resolver) {

    const directusPrivateUrl = process.env.NUXT_DIRECTUS_PRIVATE_URL ?? ''
    const directusPrivateToken = process.env.NUXT_DIRECTUS_PRIVATE_TOKEN ?? ''

    const fetchedRoutes = await directusFetchRoutes(createDirectusClient(directusPrivateUrl, directusPrivateToken))

    if (!fetchedRoutes) {
        return
    }

    const {routes, home_page} = fetchedRoutes

    if (home_page?.selected_page?.guid) {
        pages.push(
            {
                path: '/',
                name: 'home',
                file: resolver.resolve('../BuilderPage.vue'),
                meta: {
                    pageGuid: home_page.selected_page.guid ?? 'home'
                }
            })
    }

    if (routes?.route_list) {
        routes.route_list.forEach(route => {

            const routeResolvedPage = route?.route?.at(-1)

            if (!routeResolvedPage) {
                return
            }

            if (routeResolvedPage.page_id?.is_dynamic) {
                pages.push({
                               path: route?.parsed_route ?? '',
                               file: resolver.resolve('../BuilderPage.vue'),
                               meta: {
                                   pageGuid:    routeResolvedPage?.page_id?.guid ?? '',
                                   dynamicGuid: route.params.dynamicGuid
                               }
                           })
            } else {
                pages.push({
                               path: route?.parsed_route ?? '',
                               file: resolver.resolve('../BuilderPage.vue'),
                               meta: {
                                   pageGuid: routeResolvedPage.page_id?.guid ?? ''
                               }
                           })
            }
        })
    }
}

export default defineNuxtModule(
    {
        setup(resolvedOptions, nuxt) {

            const resolver = createResolver(import.meta.url)

            extendPages(async (pages) => {
                await addPagesFromCMS(pages, resolver)
            })
        },
    })
