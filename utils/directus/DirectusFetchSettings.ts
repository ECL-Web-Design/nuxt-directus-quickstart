import {readSingleton} from "@directus/sdk"
import {directusFragments, DirectusSdkClient} from "~/utils/directus/DirectusSdkClient"
import {SiteSettings} from "~/types/DirectusSchema.types"

export default async function fetchSiteSettings(directusSdkClient: DirectusSdkClient): Promise<SiteSettings | null> {
    if (!directusSdkClient) {
        console.warn('Directus sdk is not initialised')

        return Promise.resolve(null)
    }

    return await directusSdkClient.request(readSingleton('site_settings', {
        fields: [
            'global_meta_title',
            'site_name',
            {
                logo: directusFragments.directusImage
            },
            {
                social_links: [
                    'key',
                    'link'
                ]
            }
        ]
    })) as SiteSettings
}
