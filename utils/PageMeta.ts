import srcConstruct from "~/utils/directus/DirectusSrcConstruct"
import {useHead} from "unhead"
import {Page} from "~/types/DirectusSchema.types"

export function setPageMeta(pageData: Partial<Page> | null, globalTitle?: string | null) {

    function titleTemplateFn(title?: string) {

        if (!title && globalTitle) {
            return globalTitle
        }

        if (title && globalTitle) {
            return `${globalTitle} | ${title}`
        }

        if (title && !globalTitle) {
            return title
        }

        return 'Default Title'
    }

    if (pageData) {

        const tags: { name: string, property: string, content: string }[] = []

        for (const tag of pageData.meta_tags ?? []) {
            tags.push({
                          name:     tag?.meta_name ?? '',
                          property: tag?.meta_name ?? '',
                          content:  tag?.meta_content ?? ''
                      })
        }

        tags.push({
                      name:     "og:title",
                      property: "og:title",
                      content:  pageData?.og_title ?? ''
                  })

        tags.push({
                      name:     "og:description",
                      property: "og:description",
                      content:  pageData?.og_description ?? ''
                  })

        tags.push({
                      name:     "og:image",
                      property: "og:image",
                      content:  srcConstruct(pageData.og_image)?.src
                  })

        useHead({
                    title:         pageData.meta_title,
                    titleTemplate: titleTemplateFn,
                    meta:          tags,
                })
    }
}
