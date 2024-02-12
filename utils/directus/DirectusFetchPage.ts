import {directusFragments, DirectusSdkClient} from "~/utils/directus/DirectusSdkClient"
import {Page} from "~/types/DirectusSchema.types"
import {readItems} from "@directus/sdk"

export default async function fetchPage(
    guid: string,
    directusSdkClient: DirectusSdkClient
): Promise<Partial<Page> | null> {

    if (!directusSdkClient) {
        console.warn('Directus SDK not initialised correctly')

        return Promise.resolve(null)
    }

    return new Promise(async (resolve, reject) => {
        const res = await directusSdkClient.request(readItems('page', {
            filter: {
                guid: {
                    _eq: guid
                }
            },
            fields: [
                'guid',
                'meta_title',
                {
                    meta_tags: [
                        'meta_title',
                        'meta_content'
                    ]
                },
                'og_title',
                'og_description',
                {og_image: directusFragments.directusImage},
                {
                    sections: [
                        'collection',
                        {
                            //@ts-ignore
                            item: ['*.*.*.*']
                        }
                    ]
                }
            ]
        }))

        if (!res || res.length < 1) {
            reject('No Page Found')
            return
        }

        resolve(res[0] as Partial<Page>)
    })
}
