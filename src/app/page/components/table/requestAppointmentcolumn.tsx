import { tooltipPlainText } from "src/utils/utils";
import { Convert } from "utils";
export const requestAppointmentColumn = [
  {
      key: 'fullname',
      name: 'Bệnh nhân',
      minWidth: 120,
      maxWidth: 220,
      isResizable: true,
      onRender: (item) => {
          return <span>{tooltipPlainText(item.fullname)}</span>;
      },
  },
  {
    key: 'gender',
    name: 'Giới tính',
    minWidth: 80,
    maxWidth: 100,
    isResizable: true,
    onRender: (item) => {
        return <span>{Convert.convertGender(item.gender)}</span>;
    },
},
  {
      key: 'appointmentDate',
      name: 'Ngày hẹn lịch',
      minWidth: 70,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => {
          return <span>{tooltipPlainText(item.appointmentDate)}</span>;
      },
  },
  {
    key: 'initialSymptom',
    name: 'Lý do',
    minWidth: 100,
    maxWidth: 130,
    isResizable: true,
    onRender: (item) => {
        return <span>{tooltipPlainText(item.initialSymptom)}</span>;
    },
  },
  {
    key: 'dateOfBirth',
    name: 'Ngày sinh',
    minWidth: 100,
    maxWidth: 130,
    isResizable: true,
    onRender: (item) => {
        return <span>{tooltipPlainText(item.dateOfBirth)}</span>;
    },
  },
  {
    key: 'insurance',
    name: 'Số BHYT',
    minWidth: 100,
    maxWidth: 130,
    isResizable: true,
    onRender: (item) => {
      return <span>{tooltipPlainText(item.insurance)}</span>;
    },
  },
  {
    key: 'address',
    name: 'Địa chỉ',
    minWidth: 100,
    maxWidth: 130,
    isResizable: true,
    onRender: (item) => {
        return <span>{tooltipPlainText(item.address)}</span>;
    },
  },
  {
    key: 'phonenumber',
    name: 'Số điện thoại',
    minWidth: 100,
    maxWidth: 130,
    isResizable: true,
    onRender: (item) => {
        return <span>{tooltipPlainText(item.phonenumber)}</span>;
    },
  },
  {
    key: 'email',
    name: 'Email',
    minWidth: 100,
    maxWidth: 130,
    isResizable: true,
    onRender: (item) => {
        return <span>{tooltipPlainText(item.email)}</span>;
    },
  },
];