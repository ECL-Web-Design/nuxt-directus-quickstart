<template>
    <form class="form-builder" @submit.prevent="onSubmit">
        <transition-slide>
            <div v-if="showFormContent" class="form-content">
                <multi-step-form v-model="mappedValues"
                                 :structure="formStructure"
                                 @validate="onValidate"></multi-step-form>
            </div>
            <div v-else-if="showLoading" class="form-load">
                <slot name="loading">
                    Loading
                </slot>
            </div>
            <div v-else-if="showAfterSubmit" class="form-after-submit">
                <slot v-if="formSubmitOk" name="submit-success" v-bind="{content: formData.on_submit_success}">
                    <material-icon-symbol :icon-name="formData.submit_success_icon ?? ''"
                                          class="success-icon"
                                          filled>
                    </material-icon-symbol>
                    <editorjs-renderer :content="formData.on_submit_success as OutputData"
                                       class="form-submit-success"></editorjs-renderer>
                </slot>
                <slot v-else name="submit-error" v-bind="{content: formData.on_submit_error}">
                    <material-icon-symbol :icon-name="formData.submit_error_icon ?? ''" class="error-icon">
                    </material-icon-symbol>
                    <editorjs-renderer :content="formData.on_submit_error as OutputData"
                                       class="form-submit-error"></editorjs-renderer>
                </slot>
            </div>
            <div v-else></div>
        </transition-slide>
    </form>
</template>

<script lang="ts" setup>

import MultiStepForm from "@/components/generic/MultiStepForm.vue"
import type {FormBuilderData, FormBuilderField, MultiStepFormDataStructure, NameMappedValues} from "@/types/Form.types"
import {computed, ComputedRef, ref, watch} from "vue"
import EditorjsRenderer from "@/components/generic/EditorjsRenderer.vue"
import TransitionSlide from "~/components/transitions/TransitionSlide.vue"
import {sleep} from "@/helpers/helpers"
import MaterialIconSymbol from "@/components/generic/MaterialIconSymbol.vue"
import {OutputData} from "@editorjs/editorjs"

const props = defineProps<{
    formData: FormBuilderData
}>()

const postUrl = computed(() => {
    return props.formData.post_url
})

const mappedValues = ref<NameMappedValues>({})

const formStructure: ComputedRef<MultiStepFormDataStructure> = computed(() => {

    const {grouped, group_list, field_list} = props.formData

    if (grouped && !group_list) {
        return []
    }

    if (grouped && group_list && group_list.length > 0) {
        return group_list
    }

    if (!grouped && field_list?.length > 0) {
        return [{group_label: '', group_small_text: '', fields: field_list}]
    }

    return []
})

function updateMappedValues() {

    function addFields(fields: FormBuilderField[] | undefined | null) {
        fields?.forEach(field => {
            if (field && (field.name in mappedValues.value)) {
                mappedValues.value[field.name] = null
            }
        })
    }

    if (props.formData.grouped) {
        props.formData.group_list?.forEach(group => {
            addFields(group?.fields as FormBuilderField[])
        })
    } else {
        addFields(props.formData.field_list as FormBuilderField[])
    }
}

watch(() => props.formData, updateMappedValues, {deep: true})

const isValid = ref(false)

function onValidate(valid: boolean) {
    isValid.value = valid
}

const formSubmitLoading = ref(false)

const formSubmitted = ref(false)
const formSubmitOk = ref(true)


const showFormContent = computed(() => {
    return !formSubmitted.value && !formSubmitLoading.value
})

const showLoading = computed(() => {
    return formSubmitLoading.value && !formSubmitted.value
})

const showAfterSubmit = computed(() => {
    return formSubmitted.value
})

async function onSubmit(e: Event) {
    e.preventDefault()
    e.stopImmediatePropagation()

    if (postUrl.value) {
        formSubmitLoading.value = true

        const resp = (await fetch(postUrl.value, {
            method:  'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:    JSON.stringify(mappedValues.value)
        })).status

        await sleep(500)

        if (resp !== 200) {
            formSubmitOk.value = false
        }

        formSubmitted.value = true
    }

    formSubmitLoading.value = true
}

function onNext() {

}

</script>

<style lang="scss" scoped>

.form-builder {

}

</style>
