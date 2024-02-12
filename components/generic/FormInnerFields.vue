<template>
    <div class="form-inner-fields">
        <template v-for="(field, index) in filteredFields" :key="index">
            <validated-input v-model="values[field.name]"
                             :display-error="displayErrors"
                             :display-real-time-validation="field?.real_time_validation ?? false"
                             :input-id="field.id + ''"
                             :input-name="field.name"
                             :input-placeholder="field.placeholder ?? undefined"
                             :input-type="field.type as FieldType"
                             :label="field.label ?? undefined"
                             :note="field?.note ?? undefined"
                             :options-list="field?.dynamic_options ? dynamicOptionLists[field.id] : field.static_options_list"
                             :required="field.required ?? false"
                             :use-option-icons="!!(dynamicOptionLists?.[field.id]?.[0]?.icon)"
                             :validate-callback="fieldValidationCallbacks[field.id]"
                             float-label
                             @validity-check="onInputValidityCheck"></validated-input>
        </template>
        <small v-if="props.fieldsSmallText" class="fields-small-text">{{ props.fieldsSmallText }}</small>
    </div>
</template>

<script lang="ts" setup>

import ValidatedInput from "@/components/generic/ValidatedInput.vue"
import type {
    FieldDisplayCondition,
    FieldValueTypes,
    FormBuilderField,
    NameMappedValues,
    OptionList
} from "@/types/Form.types"
import {FieldType} from "@/types/Form.types"
import type {Ref} from "vue"
import {computed, onActivated, reactive, ref, watch} from "vue"
import {objectFieldByString} from "@/helpers/helpers"
import type {ValidityCheck, ValidityReturn} from "@/types/validation.types"
import {ValidationStatus} from "@/types/validation.types"
import {checkValueValidity} from "@/utils/Validation"
import {useAsyncData} from "#app"

const props = defineProps<{
    fields: FormBuilderField[],
    displayErrors?: boolean,
    fieldsSmallText?: string,
}>()

const emit = defineEmits<{
    (event: 'validate', allValid: boolean): void
}>()

const values = defineModel<NameMappedValues>() as Ref<NameMappedValues>

const fieldValidityMap = ref<{ [InputId: string]: ValidityReturn }>({})

const inputProps = computed(() => {
    return {}
})

function onInputValidityCheck(inputId: string, validity: ValidityReturn) {
    fieldValidityMap.value[inputId] = validity

    updateGroupValidity()
}

function updateGroupValidity() {
    if (Object.values(fieldValidityMap.value).every(validity => validity.status === ValidationStatus.OK)) {
        emit('validate', true)
        return
    }

    emit("validate", false)
}

onActivated(updateGroupValidity)

//option lists for select inputs, keyed with input id
const dynamicOptionLists = reactive<{ [InputID: string]: OptionList<any> }>({})

const fieldValidationCallbacks = computed<{ [InputID: string]: (value: any) => ValidityReturn }>(() => {

    const callbacks: { [InputID: string]: (value: any) => ValidityReturn } = {}

    for (const index in props.fields) {

        const {validation_checks, id: inputId} = props.fields[index]

        if (!validation_checks || validation_checks.length < 1) {
            continue
        }

        callbacks[inputId] = (value: FieldValueTypes) => {

            for (const check of validation_checks) {

                if (!checkValueValidity(value, (check?.checks ?? []) as ValidityCheck[])) {
                    return {
                        message: check?.validation_fail_message ?? '',
                        status:  ValidationStatus.ERROR
                    }
                }
            }

            return {
                message: 'success',
                status:  ValidationStatus.OK
            }
        }
    }
    return callbacks
})

function shouldFieldDisplay(displayConditions: FieldDisplayCondition[]) {

    if (!displayConditions || displayConditions.length < 1) {
        return true
    }

    return displayConditions.every(condition => {

        if (!values.value) {
            return false
        }

        if (condition.value === 'true') {
            return !!(values.value[condition.name])
        }

        if (condition.value === 'false') {
            return !(values.value[condition.name])
        }

        return (values.value[condition.name] + '') === condition.value
    })
}

const filteredFields = computed(() => {
    return props.fields.filter(field => shouldFieldDisplay(field.display_conditions as FieldDisplayCondition[]))
})

function constructOptionList(optionsData: any[], valueField: string, labelField: string, iconField?: string) {
    const options: OptionList<any> = []

    optionsData?.forEach(val => {
        options.push(
            {
                label: objectFieldByString(val, labelField),
                value: objectFieldByString(val, valueField),
                icon:  iconField ? objectFieldByString(val, iconField) : undefined
            })
    })

    return options
}

async function handleOptionDataRaw(field: FormBuilderField & { value?: FieldValueTypes }) {
    const {
        id:                         fieldId,
        dynamic_option_label_field: labelField,
        dynamic_option_value_field: valueField,
        dynamic_option_icon_field:  iconField,
        dynamic_options_data_field: dataField,
        dynamic_options:            useDynamicOptions,
        dynamic_options_fetch_url:  fetchUrl
    } = field

    if (fieldId in dynamicOptionLists ||
        !useDynamicOptions ||
        !fetchUrl ||
        !labelField ||
        !valueField) {
        return
    }

    const optionsData = await useAsyncData(
        fieldId + '',
        async () => await (await fetch(fetchUrl ?? ''))?.json()
    )

    dynamicOptionLists[fieldId] = constructOptionList(
        dataField ?
        objectFieldByString(optionsData, dataField) :
        optionsData,
        valueField,
        labelField,
        iconField ?? undefined
    )
}

async function fetchDynamicOptions() {
    for (const field of props.fields) {
        handleOptionDataRaw(field)
    }
}

watch(() => props.fields, async (fields, oldFields) => {
    if (fields && oldFields && fields.length !== oldFields.length) {
        await fetchDynamicOptions()
    }
})

await fetchDynamicOptions()

</script>

<style lang="scss" scoped>

.form-inner-fields {
  display: grid;
  gap: 1rem;
}

</style>
