export const validateUserName = (value) => {
    const regex = new RegExp('^[a-zA-Z0-9]+$');
    return regex.test(value);
}

export const validateEmail = (value) => {
    const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    return regex.test(value) || value === "";
}

export const validatePhoneNumber = (value) => {
    const regex = new RegExp('^[0-9]{10,11}$');
    return regex.test(value);
}

export const validateFullName = (value) => {
    const regex = new RegExp('/^[\p{L}\s\']+$/u');
    return regex.test(value);
}
