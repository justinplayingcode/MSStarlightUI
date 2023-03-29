export default class Ultils {
    public static convertShortenString = (t: string, n: number): string => {
        if (t.length > n) {
            return `${t.slice(0, n)}...`;
        } else {
            return t;
        }
    }


}