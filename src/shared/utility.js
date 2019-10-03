export const validateForm = (value, rules) => {
    let isValid = true;

    if (rules.maxLenght <= value.lenght) {
        isValid = false;
    }

    if (rules.minLenght <= value.lenght) {
        isValid = false;
    }


    return isValid;
}

export const updateObject = (oldObject, updateProperties) => ({
    ...oldObject,
    ...updateProperties
})