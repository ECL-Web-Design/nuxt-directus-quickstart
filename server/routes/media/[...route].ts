import {defineEventHandler, getQuery, proxyRequest} from "h3"

// Proxies media from the directus api so that it can be served over the public url
export default defineEventHandler(async (event) => {

    // API url needs to be set in .env
    const apiUrl = process.env.NUXT_DIRECTUS_PRIVATE_URL ?? ''

    return proxyRequest(
        event,
        `${apiUrl}/assets/${event.context.params?.route}?${new URLSearchParams(getQuery(event)).toString()}`
    )
})