export default class Convert {
    public static shortenString = (t: string, n: number):string => {
            if(t.length > n) {
                return `${t.slice(0,n)}...`;
        } else {
                return t;
        }
    }

    public static getAge = (date: string) => {
        const dateOfBirth = new Date(date)
        const year = dateOfBirth.getFullYear();
        const current = new Date().getFullYear();
        return (current - year).toString();
    }

    public static getBornYear = (date: string) => {
        const dateOfBirth = new Date(date);
        return dateOfBirth.getFullYear();
    }

}