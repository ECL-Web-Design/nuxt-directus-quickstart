<template>
    <div class="validated-input">
        <div :class="[{'p-float-label float-label': floatLabel && !floatLabelOverride}, props.inputType.toLowerCase()]"
             class="input-container">
            <label v-if="!floatLabel || floatLabelOverride" :for="$attrs.name as (string | undefined)">
                {{ label }}
                <small v-if="required" class="required">*</small>
                <small v-else class="optional">(optional)</small>
            </label>
            <component :is="resolvedComponent.component" v-if="resolvedComponent.component"
                       :id="inputId"
                       v-model="modelValue"
                       :aria-describedby="helpTextId"
                       :class="[errorClass]"
                       :inputId="inputId"
                       :name="inputName"
                       :options="optionsList"
                       :placeholder="inputPlaceholder"
                       class="input-inner"
                       v-bind="resolvedComponent.additionalProps"
                       @blur="beenFocused = true">
                <!-- @vue-skip -->
                <template v-if="inputType === FieldType.OPTION_MULTI && useOptionIcons" #option="slotProps">

                    <div class="option-template">
                        <material-icon-symbol :icon-name="slotProps.option.icon"
                                              class="option-label"></material-icon-symbol>
                        <div class="option-label">{{ slotProps.option.label }}</div>
                    </div>
                </template>
            </component>
            <div v-else class="invalid">INVALID INPUT TYPE: [{{ inputType }}]</div>
            <label v-if="floatLabel && !floatLabelOverride"
                   :for="$attrs.name as (string | undefined)"
                   class="input-label">
                {{ label }}
                <small v-if="required" class="required">*</small>
                <small v-else class="optional">(optional)</small>
            </label>
            <small :id="helpTextId"
                   :class="{'hide' : !showErrorMessage && !note, 'p-error': showErrorMessage && validStatus?.message, 'wiggle': errorWiggle}"
                   class="error-message help-note">
                {{ showErrorMessage ? validStatus.message : note }}</small>
        </div>
    </div>
</template>

<script generic="ValueType extends FieldValueTypes" lang="ts" setup>

import type {FieldValueTypes, OptionList} from "@/types/Form.types"
import {FieldType} from "@/types/Form.types"
import {computed, defineAsyncComponent, defineModel, ref, watch, watchEffect} from "vue"
import type {ValidityReturn} from "@/types/validation.types"
import {ValidationStatus} from "@/types/validation.types"
import MaterialIconSymbol from "@/components/generic/MaterialIconSymbol.vue"
import {sleep} from "@/helpers/helpers"

const InputText = defineAsyncComponent(() => import('primevue/inputtext'))
const InputNumber = defineAsyncComponent(() => import('primevue/inputnumber'))
const InputCheck = defineAsyncComponent(() => import('primevue/checkbox'))
const SelectSingle = defineAsyncComponent(() => import('primevue/dropdown'))
const SelectMulti = defineAsyncComponent(() => import('primevue/multiselect'))
const InputCalendar = defineAsyncComponent(() => import('primevue/calendar'))
const Textarea = defineAsyncComponent(() => import('primevue/textarea'))
const SelectButton = defineAsyncComponent(() => import('primevue/selectbutton'))

const props = defineProps<{
    inputId: string,
    inputType: FieldType,
    helpText?: string,
    loading?: boolean,
    note?: string,
    required?: boolean,
    label?: string,
    inputPlaceholder?: string,
    inputName?: string,
    floatLabel?: boolean,
    displayError?: boolean,
    //overrides displayError property, shows errors on keypress instead
    displayRealTimeValidation?: boolean,
    //only used if input is of select type
    optionsList?: OptionList<FieldValueTypes>,
    useOptionIcons?: boolean,
    validateCallback?: (value: FieldValueTypes) => ValidityReturn
}>()

const emit = defineEmits<{
    (event: 'validity-check', inputId: string, validity: ValidityReturn): void
}>()

const componentMap = {
    [FieldType.TEXT]:          {
        component:       InputText,
        additionalProps: {}
    },
    [FieldType.TEXTAREA]:      {
        component:       Textarea,
        additionalProps: {}
    },
    [FieldType.NUMBER]:        {
        component:       InputNumber,
        additionalProps: {}
    },
    [FieldType.CHECKBOX]:      {
        component:       InputCheck,
        additionalProps: {
            binary: true
        }
    },
    [FieldType.OPTION_SINGLE]: {
        component:       SelectSingle,
        additionalProps: {
            optionLabel: "label",
            optionValue: "value"
        },
    },
    [FieldType.OPTION_MULTI]:  {
        component:       SelectMulti,
        additionalProps: {
            optionLabel: "label",
            optionValue: "value",
            display:     'chip'
        }
    },
    [FieldType.OPTION_BUTTON]: {
        component:       SelectButton,
        additionalProps: {
            optionLabel: "label",
            optionValue: "value"
        }
    },
    [FieldType.TIME]:          {
        component:       InputCalendar,
        additionalProps: {
            timeOnly: true
        }
    },
    [FieldType.DATETIME]:      {
        component:       InputCalendar,
        additionalProps: {
            showTime: true
        }
    },
    [FieldType.DATE]:          {
        component:       InputCalendar,
        additionalProps: {}
    }
}

const resolvedComponent = computed(() => {
    return componentMap[props.inputType]
})

const modelValue = defineModel<FieldValueTypes>()

const helpTextId = computed(() => {
    return `${props.inputId}-help`
})

const errorClass = computed(() => {
    if (!showErrorMessage.value) {
        return ''
    }

    return 'p-invalid'
})

const floatLabelOverride = computed(() => {
    const {inputType} = props
    return inputType === FieldType.CHECKBOX || inputType === FieldType.OPTION_BUTTON
})

const beenFocused = ref(false)

const validStatus = computed(() => {

    if (props.required &&
        (modelValue.value ===
         null ||
         modelValue.value ===
         undefined ||
         (modelValue.value as string[] | number[])?.length ===
         0)) {
        return {
            message: 'Field is required',
            status:  ValidationStatus.ERROR
        }
    }

    if (!props.validateCallback || modelValue.value === null || modelValue.value === undefined) {
        return {
            message: '',
            status:  ValidationStatus.OK
        }
    }

    return props.validateCallback(modelValue.value)
})

watchEffect(() => {
    emit('validity-check', props.inputId, validStatus.value)
})

const showErrorMessage = computed(() => {
    return ((props.displayRealTimeValidation && beenFocused.value) || props.displayError) &&
           validStatus.value.message &&
           validStatus.value.status !== ValidationStatus.OK
})

const errorWiggle = ref(false)

async function triggerValidationTransition() {
    errorWiggle.value = true
    await sleep(300)
    errorWiggle.value = false
}

watch(() => props.displayError, (value, oldValue) => {
    if (value && !oldValue) {
        triggerValidationTransition()
    }
})

</script>

<style lang="scss">

.float-label {
  margin-top: 1.5rem;
}

.input-inner {
  width: 100%;
}

.input-label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 90%;
}

.option-template {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-message, .help-note {
  min-height: 0.8rem;
  min-width: 10px;
  display: inline-block;
}

.required {
  color: var(--soft-error);
}

.optional {
  translate: 0 -20%;
  display: inline-block;
  opacity: 0.7;
}

.selectbutton {
  display: grid;
  gap: 0.7rem;
}

.help-note {
  font-size: var(--font-smaller);
  opacity: 0.7;
  padding-left: 0.5rem;
}

.help-note.p-error {
  opacity: 1;
}

.wiggle {
  animation: wiggle 0.3s infinite;
}

@keyframes wiggle {
  0% {
    translate: 0 0;
  }
  25% {
    translate: 6% 0;
  }
  50% {
    translate: -6% 0;
  }
  75% {
    translate: 6% 0;
  }
  100% {
    translate: 0 0;
  }
}

</style>
