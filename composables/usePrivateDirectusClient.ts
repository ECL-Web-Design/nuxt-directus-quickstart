import {useRuntimeConfig} from "#app"
import {createDirectusClient} from "~/utils/directus/DirectusSdkClient"

// returns the private api for data fetching, using the env file values.
// will return an invalid sdk client when used client side as the private env values will not be present
export default function usePrivateDirectusClient() {
    const {directusPrivateUrl, directusPrivateToken} = useRuntimeConfig()
    return createDirectusClient(directusPrivateUrl, directusPrivateToken)
}
