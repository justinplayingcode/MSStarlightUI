export default class Common {
    public static convertShortenString = (t: string, n: number):string => {
            if(t.length > n) {
                return `${t.slice(0,n)}...`;
        } else {
                return t;
        }
    }
}

