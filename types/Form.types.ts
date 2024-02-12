import {FormField, FormGroup, Forms} from "@/types/DirectusSchema.types"

export enum FieldType {
    TEXT = 'text',
    NUMBER = 'number',
    TEXTAREA = 'textarea',
    OPTION_SINGLE = 'selectSingle',
    OPTION_MULTI = 'selectMulti',
    OPTION_BUTTON = 'selectButton',
    DATE = 'date',
    TIME = 'time',
    DATETIME = 'datetime',
    CHECKBOX = 'checkbox'
}

//label uses value if not defined
export type OptionList<T> = { label?: string, value: T, icon?: string }[]

export type FieldValueTypes = string | number | Date | boolean | null | string[] | number[]

export type FormBuilderField = FormField & { value?: FieldValueTypes }

export type FormBuilderGroup = FormGroup

export type FormBuilderData = Forms

export interface NameMappedValues {
    [InputName: string]: FieldValueTypes
}

export interface FieldDisplayCondition {
    name: string,
    value: string
}

export type MultiStepFormDataStructure = Pick<FormGroup, 'group_label' | 'fields' | 'group_small_text'>[]
