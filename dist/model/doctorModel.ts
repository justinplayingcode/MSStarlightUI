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
        text: 'Bác sĩ'
    },
]

export const mappingDoctorRank = {
  [DoctorRank.thacSi]: 'Thạc sĩ',
  [DoctorRank.tienSi]: 'Tiến sĩ',
  [DoctorRank.PGSTS]: 'Phó Giáo sư, Tiến sĩ',
  [DoctorRank.GSTS]: 'Giáo sư, Tiến sĩ',
  [DoctorRank.none]: 'Bác sĩ',
}

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

export const mappingDoctorPosition = {
  [DoctorPosition.dean]: 'Trưởng Khoa',
  [DoctorPosition.viceDean]: 'Phó Khoa',
  [DoctorPosition.none]: 'Không',
}

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

export const TestList = {
  [TypeOfTest.sinhHoa]: "Xét nghiệm sinh hóa",
  [TypeOfTest.dongMau]: "Xét nghiệm đông máu",
  [TypeOfTest.huyetHoc]: "Xét nghiệm máu",
  [TypeOfTest.nuocTieu]: "Xét nghiệm nước tiểu",
  [TypeOfTest.sieuAm]: "Siêu âm",
  [TypeOfTest.dienTim]: "Điện tâm đồ (Điện tim)",
  [TypeOfTest.chupXQuang]: "Chụp X quang",
  [TypeOfTest.chupCT]: "Chụp cắt lớp vi tính (CT)",
}