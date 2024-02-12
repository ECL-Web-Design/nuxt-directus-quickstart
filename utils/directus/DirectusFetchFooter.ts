import {readSingleton} from "@directus/sdk"
import {PageFooter} from "~/types/DirectusSchema.types"
import {DirectusSdkClient} from "~/utils/directus/DirectusSdkClient"

export default async function fetchFooter(directusSdkClient: DirectusSdkClient): Promise<Partial<PageFooter> | null> {

    if (!directusSdkClient) {
        console.warn('Directus SDK not initialised correctly')

        return Promise.resolve(null)
    }

    return await directusSdkClient.request(readSingleton('page_footer', {
        fields: [
            {privacy_policy_route: ['parsed_route']},
            {
                footer_button: [
                    //@ts-ignore
                    'route_link.parsed_route',
                    'button_text'
                ]
            },
            'copywrite_info',
            {
                sections: [
                    'heading',
                    {links: ['parsed_route', 'navbar_label', 'active_page.guid']}
                ]
            }
        ]
    })) as Partial<PageFooter>
}
