<template>
    <div class="single-step-form">
        <form-inner-fields v-model="values" :fields="formStructure.fields"></form-inner-fields>
    </div>
</template>

<script lang="ts" setup>

import FormInnerFields from "~/components/generic/FormInnerFields.vue"
import {FormGroup} from "~/types/DirectusSchema.types"
import type {NameMappedValues} from "~/types/Form.types"

const values = defineModel<NameMappedValues>()

const props = defineProps<{
    formStructure: FormGroup,
}>()

</script>

<style lang="scss" scoped>

</style>
