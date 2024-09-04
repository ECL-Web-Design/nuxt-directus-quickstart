import {DirectusFiles} from "~/types/DirectusSchema.types"

// Constructs an image source from directus file response type. 
// Relies on server/routes/media/[...route].ts as a proxy so that images can be served over the public url
export default function srcConstruct(imageData: Partial<DirectusFiles> | null | undefined, transformKey?: string) {
    if (imageData) {

        return {
            src: `media/${imageData.id}/${imageData.filename_download}${transformKey ?
                `?key=${transformKey}` :
                ''}`,
            alt: imageData.description ?? ''
        }
    }

    return {src: '', alt: ''}
}
