import {readSingleton} from "@directus/sdk"
import {HomePage, Routes} from "../../types/DirectusSchema.types"
import {DirectusSdkClient} from "../../utils/directus/DirectusSdkClient"

export default async function directusFetchRoutes(sdkClient: DirectusSdkClient): Promise<{
    routes: Partial<Routes>,
    home_page: Partial<HomePage> | null
}> {
    if (!sdkClient) {
        console.warn('Directus SDK not initialised correctly')

        return Promise.resolve({routes: {route_list: []}, home_page: null})
    }

    const routes = await sdkClient.request(readSingleton('routes', {
        fields: [
            {
                route_list: [
                    'active_page.guid',
                    'parsed_route',
                    {route: ['page_id.guid', 'page_id.is_dynamic', 'page_id.is_home_page']},
                    'navbar_label',
                    'show_on_navbar',
                ]
            }
        ],
        sort:   ['route_list.sort'] as any
    }))

    const homePage = await sdkClient.request(readSingleton('home_page', {
        fields: [
            {
                selected_page: [
                    'guid'
                ]
            }
        ]
    }))

    return {
        routes:    routes as Partial<Routes>,
        home_page: homePage as Partial<HomePage>
    }
}
