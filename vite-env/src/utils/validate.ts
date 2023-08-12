/* eslint-disable no-useless-escape */
export default class Validate {
    public static userName = (value: any) => {
        const regex = new RegExp('^[a-zA-Z0-9]+$');
        return regex.test(value);
    }

    public static email = (value: any) => {
        const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
        return regex.test(value) || value === "";
    }

    public static phoneNumber = (value: any) => {
        const regex = new RegExp('^[0-9]{10,11}$');
        return regex.test(value);
    }

    public static validateFullName = (value: any) => {
        const regex = new RegExp('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$');
        return regex.test(value);
    }

    public static identification = (value: any) => {
        // 12 so, cac so tu 0 den 9 
        const regex = new RegExp('^[0-9]{12}$');
        return regex.test(value) || value === "";
    }

    public static insurance = (value: any) => {
        // 10 ki tu
        return value.length === 10;
    }

    public static bloodPressure = (value: any) => {
      const regex = new RegExp('^\\d+\\/\\d+$');
      return regex.test(value);
    }

    public static isNumber = (value: any) => {
      const regex = /^\d+$/;
      return regex.test(value);
    }

    public static isDecimal = (value: any) => {
      const regex = /^\d+(\.\d{1,2})?$/;
      return regex.test(value)
    }
}

