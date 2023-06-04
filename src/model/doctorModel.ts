import { IDropdownOption } from "@fluentui/react"
import { DoctorRank, DoctorPosition, TypeAppointmentSchedule, TypeOfTest } from "./enum"

export const doctorRank: IDropdownOption[] = [
    {
        key: `${DoctorRank.thacSi}`,
        text: 'Thạc sĩ'
    },
    {
        key: `${DoctorRank.tienSi}`,
        text: 'Tiến sĩ'
    },
    {
        key: `${DoctorRank.PGSTS}`,
        text: 'Phó Giáo sư, Tiến sĩ'
    },
    {
        key: `${DoctorRank.GSTS}`,
        text: 'Giáo sư, Tiến sĩ'
    },
    {
        key: `${DoctorRank.none}`,
        text: 'Không'
    },
]

export const doctorPosition: IDropdownOption[] = [
    {
        key: `${DoctorPosition.dean}`,
        text: 'Trưởng Khoa'
    },
    {
        key: `${DoctorPosition.viceDean}`,
        text: 'Phó Khoa'
    },
    {
        key: `${DoctorPosition.none}`,
        text: 'Không'
    },
]

export const appointmentTypeList: IDropdownOption[] = [
    {
        key: `${TypeAppointmentSchedule.khamThuong}`,
        text: "Khám thông thường"
    },
    {
        key: `${TypeAppointmentSchedule.khamTheoBHYT}`,
        text: "Khám theo bảo hiểm y tế",
    },
    {
        key: `${TypeAppointmentSchedule.khamTheoYeuCau}`,
        text: "Khám theo yêu cầu",
        // this type is for pre-schedule
    },
    {
        key: `${TypeAppointmentSchedule.khamTheoChiDinh}`,
        text: "Khám theo chỉ định"
        // this type not render to choose
    }
]

export const TestList = [
    {
        key: TypeOfTest.SinhHoa,
        text: 'Sinh Hóa'
    },
    {
        key: TypeOfTest.DongMau,
        text: 'Đông máu'
    },
    {
        key: TypeOfTest.HuyetHoc,
        text: 'Huyết học'
    },
    {
        key: TypeOfTest.NuocTieu,
        text: 'Nước tiểu'
    },
    {
        key: TypeOfTest.SieuAm,
        text: 'Siêu âm'
    },
    {
        key: TypeOfTest.DienTim,
        text: 'Điện tim'
    },
    {
        key: TypeOfTest.XQuang,
        text: 'X-Quang'
    },
    {
        key: TypeOfTest.CTScanner,
        text: 'CT-Scanner'
    },
]