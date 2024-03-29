import { accountRole } from "model";
import { DoctorPosition, DoctorRank } from "src/model/enum";

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
        const date = new Date();
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${dayOfWeek}, ngày ${dayOfMonth} ${month} năm ${year}`;
    }

    public static convertGender = (gender: number) =>{
        return gender ? 'Nữ' : 'Nam'
    }

    public static removeDiacritics = (item: String) => {
      return item.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    public static dmystringtoDate = (dateString: string) => {
        var newData = dateString.replace(/(\d+[/])(\d+[/])/, '$2$1');
        return new Date(newData)
    }

    public static datetoddmmyyy = (date: Date) => {
        let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [day, month, year].join('/');
    }

    public static datetommddyyyy = (dateString: Date) => {
        return ((dateString.getMonth() > 8) ? (dateString.getMonth() + 1) : ('0' + (dateString.getMonth() + 1))) + '/' + ((dateString.getDate() > 9) ? dateString.getDate() : ('0' + dateString.getDate())) + '/' + dateString.getFullYear()
    }

    public static getAccountRoleName = (role: accountRole) => {
        switch(role){
            case accountRole.Admin:
                return 'Administrator';
            case accountRole.Doctor:
                return 'Bác sĩ';
            case accountRole.Patient:
                return 'Bệnh nhân';
            default:
                return '';
        }
    }

    public static getDoctorRank = (rank: DoctorRank) => {
        switch(rank){
            case DoctorRank.thacSi:
                return 'Thạc sĩ';
            case DoctorRank.tienSi:
                return 'Tiến sĩ';
            case DoctorRank.PGSTS:
                return 'Ph.Giáo sư, Tiến sĩ';
            case DoctorRank.GSTS: 
                return 'Giáo sư, Tiến sĩ';
            default:
                return 'Không';
        }
    }

    public static getDoctorPosition = (pos: DoctorPosition) => {
        switch(pos){
            case DoctorPosition.viceDean:
                return 'Phó khoa';
            case DoctorPosition.dean:
                return 'Trưởng khoa'
            default:
                return 'Bác sĩ';
        }
    }

    public static colorDonutChart = [
      'rgb(95,183,212)',
      'rgb(0,126,214)',
      'rgb(38,215,174)',
      'rgb(27,170,47)',
      'rgb(132,58,142)',
      'rgb(54,4,67)',
      'rgb(231,29,122)',
      'rgb(255,0,0)',
      'rgb(255,115,0)',
      'rgb(254,207,22)',
    ]
}