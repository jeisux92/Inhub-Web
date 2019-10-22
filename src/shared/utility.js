export const validateForm = (value, rules) => {
    let isValid = true;

    if (rules.maxLenght <= value.length) {
        isValid = false;
    }

    if (rules.minLenght >= value.length) {
        isValid = false;
    }


    return isValid;
}

export const updateObject = (oldObject, updateProperties) => ({
    ...oldObject,
    ...updateProperties
})