import {DirectusFiles} from "~/types/DirectusSchema.types"

export default function srcConstruct(imageData: Partial<DirectusFiles> | null | undefined, transformKey?: string) {
    if (imageData) {

        return {
            src: `https://api.eclwebdesign.co.uk/assets/${imageData.id}/${imageData.filename_download}${transformKey ?
                                                                                                        `?key=${transformKey}` :
                                                                                                        ''}`,
            alt: imageData.description ?? ''
        }
    }

    return {src: '', alt: ''}
}
