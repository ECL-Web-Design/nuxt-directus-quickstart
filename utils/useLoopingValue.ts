import {onMounted, onUnmounted, ref} from "vue"


export function useLoopingValue(min: number, max: number, {interval = 1000, reverse = false} = {}) {

    const looper = ref(min)
    let intervalHandle: ReturnType<typeof setTimeout>

    function loopValue(): ReturnType<typeof setTimeout> {
        return setInterval(() => {
            if (reverse) {
                looper.value--

                if (looper.value < min) {
                    looper.value = max
                }
            } else {
                looper.value++

                if (looper.value > max) {
                    looper.value = min
                }
            }
        }, interval)
    }

    onMounted(() => {
        intervalHandle = loopValue()
    })

    onUnmounted(() => {
        clearInterval(intervalHandle)
    })

    return looper
}
