import { IDropdownOption } from "@fluentui/react"
import { DoctorRank, DoctorPosition } from "./enum"

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