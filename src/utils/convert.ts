export default class Convert {
    public static shortenString = (t: string, n: number):string => {
            if(t.length > n) {
                return `${t.slice(0,n)}...`;
        } else {
                return t;
        }
    }

    public static getAge = (dateOfBirth: Date) => {
        const year = dateOfBirth.getFullYear();
        const current = new Date().getFullYear();
        return (current - year).toString();
    }

}