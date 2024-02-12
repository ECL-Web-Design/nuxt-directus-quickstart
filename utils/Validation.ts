import type {CheckCondition, ValidityCheck} from "~/types/validation.types"

function lengthConditionPrecheck(checkValue: any, compareValue: any) {
    if (!checkValue?.length) {
        console.log("Check value does not have length property")
        return false
    }

    if (isNaN(parseInt(compareValue))) {
        console.log("comparator value is not a number")
        return false
    }

    return true
}

const conditionFunctionMap: { [ConditionKey in CheckCondition]: (checkValue: any, compareValue: any) => boolean } = {
    ['regex'](checkValue: any, compareValue: any) {

        try {

            const pattern = new RegExp(compareValue)

            if (typeof checkValue === 'string' || typeof checkValue === 'number' && typeof compareValue === "string") {
                let checkVal = checkValue + ''

                return pattern.test(checkVal)
            }

        } catch (e) {
            console.log(`invalid regex ${compareValue}`)
        }

        return false
    },
    ['>'](checkValue: any, compareValue: any) {
        return checkValue > compareValue
    },
    ['<'](checkValue: any, compareValue: any) {
        return checkValue < compareValue
    },
    ['==='](checkValue: any, compareValue: any) {
        return (checkValue + '') === (compareValue + '')
    },
    ['!=='](checkValue: any, compareValue: any) {
        return (checkValue + '') !== (compareValue + '')
    },
    ['<='](checkValue: any, compareValue: any) {
        return checkValue <= compareValue
    },
    ['>='](checkValue: any, compareValue: any) {
        return checkValue >= compareValue
    },
    ['lengthMoreThan'](checkValue: any, compareValue: any) {

        if (!lengthConditionPrecheck(checkValue, compareValue)) {
            return false
        }

        return checkValue.length > compareValue
    },
    ['lengthLessThan'](checkValue: any, compareValue: any) {

        if (!lengthConditionPrecheck(checkValue, compareValue)) {
            return false
        }

        return checkValue.length < compareValue
    },
    ['lengthLessThanInclusive'](checkValue: any, compareValue: any) {

        if (!lengthConditionPrecheck(checkValue, compareValue)) {
            return false
        }

        return checkValue.length <= compareValue
    },
    ['lengthMoreThanInclusive'](checkValue: any, compareValue: any) {

        if (!lengthConditionPrecheck(checkValue, compareValue)) {
            return false
        }

        return checkValue.length >= compareValue
    },
    ['contains'](checkValue: any, compareValue: any) {

        return (checkValue + '').includes(compareValue + '')
    }
}

export function checkValueValidity(value: any, checkList: (ValidityCheck | null | undefined)[]) {
    return checkList.every(checkClause => {

        if (!checkClause || !checkClause.value || !checkClause.condition) {
            return false
        }

        if (!(checkClause.condition in conditionFunctionMap)) {
            console.log(`Invalid Condition Operator: ${checkClause.condition}`)
            return false
        }

        return conditionFunctionMap[checkClause.condition](value, checkClause.value)
    })
}




