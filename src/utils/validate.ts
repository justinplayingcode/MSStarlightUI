export default class Validate {
    public static userName = (value) => {
        const regex = new RegExp('^[a-zA-Z0-9]+$');
        return regex.test(value);
    }

    public static email = (value) => {
        const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
        return regex.test(value) || value === "";
    }

    public static phoneNumber = (value) => {
        const regex = new RegExp('^[0-9]{10,11}$');
        return regex.test(value);
    }

    public static fullName = (value) => {
        const regex = new RegExp('/^[\p{L}\s\']+$/u');
        return regex.test(value);
    }


}

