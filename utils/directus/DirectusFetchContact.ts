import {readSingleton} from "@directus/sdk"
import {Contact} from "~/types/DirectusSchema.types"
import {DirectusSdkClient} from "~/utils/directus/DirectusSdkClient"

export default async function fetchContacts(directusSdkClient: DirectusSdkClient): Promise<Contact | null> {

    if (!directusSdkClient) {
        console.warn('Directus SDK not initialised correctly')

        return Promise.resolve(null)
    }

    return await directusSdkClient.request(readSingleton('contact', {
        fields: [
            {contact_links: ['key', 'link', 'label']}
        ],
        //@ts-ignore
        sort: ['contact_links.sort']
    })) as Contact
}
