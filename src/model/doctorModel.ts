import { IDropdownOption } from "@fluentui/react"
import { DoctorRank, DoctorPosition, TypeAppointmentSchedule } from "./enum"

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