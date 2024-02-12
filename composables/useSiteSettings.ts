import {useState} from "#app"
import {Contact, DirectusFiles, HomePage, Routes, SocialLink} from "~/types/DirectusSchema.types"
import {ComputedRef, Ref, toRefs} from "vue"

//used to set the initial value of state.
// This is so that every component that uses useSiteSettings()
// doesn't have to unwrap toRefs and can instead use as normal composable
export function useSiteSettingsSetter() {
    return useState('site-settings')
}

export default function useSiteSettings() {
    return toRefs(useState('site-settings').value as {
        globalMetaTitle: Ref<string | null>,
        siteName: Ref<string | null>,
        socialLinks: Ref<SocialLink[] | null>,
        contactData: Ref<Contact | null>,
        logo: Ref<DirectusFiles | null>,
        routes: Ref<Routes>,
        homePage: Ref<HomePage | null>,
        constructedLogo: ComputedRef<{ src: string, alt: string }>
    })
}
