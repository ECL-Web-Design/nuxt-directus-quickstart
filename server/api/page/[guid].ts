import {createDirectusClient} from "~/utils/directus/DirectusSdkClient"
import fetchPage from "~/utils/directus/DirectusFetchPage"
import {createError, defineEventHandler, getRouterParam} from "h3"

export default defineEventHandler(async (event) => {

    const apiUrl = process.env.NUXT_DIRECTUS_PRIVATE_URL ?? ''
    const token = process.env.NUXT_DIRECTUS_PRIVATE_TOKEN ?? ''
    const guid = getRouterParam(event, 'guid')

    if (!apiUrl || !token || !guid) {
        throw createError({
                              statusCode:    500,
                              statusMessage: 'Error Fetching Page'
                          })
    }

    const directusSdk = createDirectusClient(apiUrl, token)

    const pageData = await fetchPage(guid, directusSdk)

    if (!pageData) {
        throw createError({
                              statusCode:    500,
                              statusMessage: 'Error fetching page or page does not exist'
                          })
    }

    return pageData
})
