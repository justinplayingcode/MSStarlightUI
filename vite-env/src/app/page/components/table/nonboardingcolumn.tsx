import { IColumn } from "@fluentui/react";
import { Convert } from "../../../../utils";
import { MappingTypeAppointmentSchedule } from "../../../../model/enum";

export const nonBoardingPatientColumns: IColumn[] = [
    {
        key: 'fullname',
        name: 'Họ và tên',
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.fullname}</span>;
        },
    },
    {
        key: 'gender',
        name: 'Giới tính',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onRender: (item) => {
            return <span>{Convert.convertGender(item.gender)}</span>;
        },
    },
    {
        key: 'dateOfBirth',
        name: 'Ngày sinh',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.dateOfBirth}</span>;
        },
    },
    {
        key: 'address',
        name: 'Địa chỉ',
        minWidth: 90,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.address}</span>;
        },
    },
    {
        key: 'insurance',
        name: 'Bảo hiểm y tế',
        minWidth: 90,
        maxWidth: 120,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.insurance}</span>;
        },
    },
    {
      key: 'phonenumber',
      name: 'Số điện thoại',
      minWidth: 90,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.phonenumber}</span>;
      },
    },
    {
      key: 'typeAppointment',
      name: 'Loại khám',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onRender: (item) => {
          return <span>{MappingTypeAppointmentSchedule[item.typeAppointment]}</span>;
      },
    },
    {
      key: 'departmentName',
      name: 'Khoa đăng ký khám',
      minWidth: 90,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.departmentName}</span>;
      },
    },
    {
      key: 'initialSymptom',
      name: 'Triệu chứng ban đầu',
      minWidth: 100,
      maxWidth: 140,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.initialSymptom}</span>;
      },
    },
];