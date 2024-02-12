import {computed} from "vue"
import useSiteSettings from "~/composables/useSiteSettings"

export default function useNavbarLinks() {

    const {routes} = useSiteSettings()

    const navLinks = computed(() => {

        const siteRoutes = routes.value

        const routesOut: { route: string, label: string }[] = [
            {route: '/', label: 'home'}
        ]

        if (!siteRoutes || !siteRoutes?.route_list) {
            return [] as { route: string, label: string }[]
        }

        siteRoutes.route_list.forEach(route => {
            if (route && route.show_on_navbar && !route.route?.at(-1)?.page_id?.is_home_page) {
                routesOut.push({
                                   route: route.parsed_route ?? '',
                                   // @ts-ignore
                                   label: route.navbar_label ?? (route.active_page?.guid ?? 'INVALID')
                               })
            }
        })

        return routesOut
    })

    return navLinks
}
