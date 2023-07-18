import { getStatusRequestSchedule, tooltipPlainText } from "src/utils/utils";
import { Convert } from "utils";

export const appointmentColumn = [
  {
      key: 'departmentName',
      name: 'Khoa',
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.departmentName}</span>;
      },
  },
  {
      key: 'appointmentDate',
      name: 'Ngày hẹn lịch',
      minWidth: 70,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.appointmentDate}</span>;
      },
  },
  {
    key: 'status',
    name: 'Trạng thái',
    minWidth: 100,
    maxWidth: 150,
    isResizable: true,
    onRender: (item) => {
        return <span>{getStatusRequestSchedule(item?.status)}</span>;
    },
  },
  {
      key: 'doctorName',
      name: 'Bác sĩ',
      minWidth: 100,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.doctorName}</span>;
      },
  },
  {
    key: 'position',
    name: 'Chức vụ',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    onRender: (item) => {
        return <span>{Convert.getDoctorPosition(item?.doctorPosition)}</span>
    },
  },
  {
    key: 'rank',
    name: 'Trình độ',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    onRender: (item) => {
        return <span>{Convert.getDoctorRank(item?.doctorRank)}</span>
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
  }
];