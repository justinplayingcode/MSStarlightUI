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

    public static convertZeroNumber = (a: number) => {
        return a===0 ? ' -- ' : a;
    }

    public static getCurrentDateString = (): string => {
        const date = new Date(); // Khởi tạo đối tượng Date hiện tại
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${dayOfWeek}, ngày ${dayOfMonth} ${month} năm ${year}`;
    }
}