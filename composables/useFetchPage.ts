import {useFetch} from "#app"
import {Page} from "~/types/DirectusSchema.types"
import {Ref} from "vue"

export default async function useFetchPage(guid: string) {
    const {data: page, error, refresh} = await useFetch(`/api/page/${guid}`)

    if (error.value) {
        throw new Error('Error Getting Page')
    }

    return {page: page as Ref<Partial<Page>>, refresh}
}
