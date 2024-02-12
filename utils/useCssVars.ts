import type {MaybeRef, Ref} from "vue"
import {reactive, ref, toRefs, unref, watchEffect} from "vue"
import {useCssVar} from "@vueuse/core"

//vars must be of format '--example-var-name'
function cssVarToCamelCase(cssVarName: string) {
    const parts = cssVarName.slice(2).split('-')
    return parts.map(function (word, index) {
        if (index === 0) {
            return word
        }
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join('')
}

//does not detect changes from Css side, ie. changing a global variable value via media query would not result in an
// update, the function would have to be rerun
export default function useCssVars(varList: MaybeRef<string[]>, elSelector: MaybeRef<string>): {
    [varName: string]: Ref<string>
} {
    const varsReturn: { [key: string]: string } = reactive({'ignore': '0'})
    const mounted = ref(false)

    for (const varName of unref(varList)) {

        const formattedVarName = cssVarToCamelCase(varName)
        varsReturn[formattedVarName] = ''
    }

    watchEffect(() => {

        if (typeof document === 'undefined') {
            return
        }

        const domElement = document.querySelector(unref(elSelector))

        if (!domElement) {
            return
        }

        for (const varName of unref(varList)) {

            const formattedVarName = cssVarToCamelCase(varName)

            if (!(varName in varsReturn)) {
                varsReturn[formattedVarName] = ''
            }

            if (mounted.value) {
                // @ts-ignore
                varsReturn[formattedVarName] = useCssVar(varName, domElement).value
            }
        }
    })

    if (!import.meta.env.SSR) {
        if (document.readyState === 'complete') {
            mounted.value = true
        } else {
            addEventListener('load', () => {
                mounted.value = true
            })
        }
    }

    return toRefs(varsReturn)
}
