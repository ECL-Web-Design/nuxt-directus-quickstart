import {createDirectus, DirectusClient, rest, RestClient, staticToken} from "@directus/sdk"
import {CustomDirectusTypes} from "~/types/DirectusSchema.types"

export type DirectusSdkClient = null | (DirectusClient<CustomDirectusTypes> & RestClient<CustomDirectusTypes>)

const clientCache: { [key: string]: DirectusSdkClient } = {}

export function createDirectusClient(apiUrl: string, staticAccessToken: string): null | DirectusSdkClient {

    let directusSdkClient = null
    const cacheKey = apiUrl + staticAccessToken

    if (cacheKey in clientCache) {
        return clientCache[cacheKey]
    }

    try {
        directusSdkClient = createDirectus<CustomDirectusTypes>(apiUrl)
            .with(rest())
            .with(staticToken(staticAccessToken))
    } catch {
        console.warn('INVALID DIRECTUS URl OR TOKEN')
    }

    if (directusSdkClient) {
        clientCache[cacheKey] = directusSdkClient
    }

    return directusSdkClient
}

const linkListFragment: string[] = []
export const directusFragments = {
    directusImage:  ['id', 'filename_download', 'description'] as ['id', 'filename_download', 'description'],
    linkList:       linkListFragment,
    builderHeading: [
        {title: ['title', 'highlighted_word']},
        'header_anchor',
        'subtitle',
        'content',
        {section_links: linkListFragment}
    ]
}
