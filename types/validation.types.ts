export enum ValidationStatus {
    OK,
    WARNING,
    ERROR,
    INFO,
    NONE
}

export interface ValidityReturn {
    message: string,
    status: ValidationStatus
}

export type CheckCondition =
    'regex'
    | '>'
    | '<'
    | '==='
    | '!=='
    | '<='
    | '>='
    | 'lengthMoreThan'
    | 'lengthLessThan'
    | 'lengthLessThanInclusive'
    | 'lengthMoreThanInclusive'
    | 'contains'

export interface ValidityCheck {
    condition?: CheckCondition | null,
    value?: string | null
}
