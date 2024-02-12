import {useContext} from "vite-ssr"

export function ssrCachedFetchAsync<T>(
    cacheKey: string,
    fetchCallback: () => Promise<T>,
    initialStateIn: Record<string, any> | null = null
): Promise<T> {
    let initialState: Record<string, any>

    if (initialStateIn) {
        initialState = initialStateIn
    } else {
        ({initialState} = useContext())
    }

    return new Promise<T>(async resolve => {
        if (initialState?.[cacheKey]) {
            resolve(initialState[cacheKey])
        } else {
            const data = await fetchCallback()

            if (import.meta.env.SSR) {
                initialState[cacheKey] = data
            }

            resolve(data)
        }
    })
}

export function ssrCachedFetch<T>(
    cacheKey: string,
    fetchCallback: () => T,
    initialStateIn: Record<string, any> | null = null
): T {
    let initialState: Record<string, any>

    if (initialStateIn) {
        initialState = initialStateIn
    } else {
        ({initialState} = useContext())
    }

    if (initialState?.[cacheKey]) {
        return initialState[cacheKey]
    } else {
        const data = fetchCallback()

        if (import.meta.env.SSR) {
            initialState[cacheKey] = data
        }

        return data
    }
}

export function ssrCachedValue(cacheKey: string, initialStateIn?: Record<string, any>) {
    let initialState: Record<string, any>

    if (initialStateIn) {
        initialState = initialStateIn
    } else {
        ({initialState} = useContext())
    }

    if (!initialState?.[cacheKey]) {
        return null
    }

    return initialState[cacheKey]
}
