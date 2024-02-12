<template>
    <div class="multi-step-form">
        <slot name="progress" v-bind="{currentStep: currentStep, totalSteps: totalSteps}">
            <span v-if="totalSteps > 1" class="progress">{{ `Step ${currentStep} of ${totalSteps}` }}</span>
        </slot>
        <slot name="label" v-bind="{currentStep: currentStep, totalSteps: totalSteps, label: currentLabel}">
            <span class="group-label">{{ currentLabel }}</span>
        </slot>
        <transition-slide :reverse="transitionReversed">
            <form-inner-fields :key="currentStep"
                               v-model="values"
                               :display-errors="displayErrors"
                               :fields="currentFields as FormBuilderField[]"
                               :fields-small-text="currentSmallText ?? undefined"
                               @validate="onGroupValidate"></form-inner-fields>
        </transition-slide>
        <transition-slide name="button-transition" vertical>
            <button v-if="currentStep === totalSteps" class="submit strong-button" type="submit" @click="onSubmit">
                Submit
            </button>
            <button v-else class="next-step strong-button" type="button" @click="onNextClick">Next</button>
        </transition-slide>
        <button v-if="currentStep > 1" class="previous-step strong-button" type="button" @click="onBackClick">Back
        </button>
    </div>
</template>

<script lang="ts" setup>

import type {FormBuilderField, MultiStepFormDataStructure, NameMappedValues} from "@/types/Form.types"
import {computed, nextTick, ref} from "vue"
import FormInnerFields from "@/components/generic/FormInnerFields.vue"
import TransitionSlide from "~/components/transitions/TransitionSlide.vue"

const values = defineModel<NameMappedValues>()

const props = defineProps<{
    structure: MultiStepFormDataStructure,
}>()

const currentStep = ref(1)
const displayErrors = ref(false)

const totalSteps = computed(() => {
    return (props.structure.length ?? 0)
})

const currentIndex = computed(() => {
    return currentStep.value - 1
})

const currentFields = computed(() => {
    if (!props.structure[currentIndex.value]?.fields) {
        return []
    }

    return props.structure[currentIndex.value]?.fields ?? []
})

const currentLabel = computed(() => {
    return props.structure[currentIndex.value]?.group_label ?? ''
})

const currentSmallText = computed(() => {
    return props.structure[currentIndex.value]?.group_small_text
})

const currentGroupValid = ref(false)

const transitionReversed = ref(false)

function onNextClick() {
    if (!currentGroupValid.value) {
        displayErrors.value = false
        nextTick(() => displayErrors.value = true)
        return
    }

    displayErrors.value = false
    nextStep()
}

function onBackClick() {
    displayErrors.value = false
    previousStep()
}

function onSubmit(e: Event) {
    if (!currentGroupValid.value) {
        displayErrors.value = false
        nextTick(() => displayErrors.value = true)

        e.stopImmediatePropagation()
        e.preventDefault()
    }

    displayErrors.value = false
}

function onGroupValidate(valid: boolean) {
    currentGroupValid.value = valid
}

function nextStep() {
    transitionReversed.value = false
    currentStep.value++
}

function previousStep() {
    transitionReversed.value = true
    currentStep.value--
}

</script>

<style lang="scss" scoped>

.multi-step-form {

}

</style>
