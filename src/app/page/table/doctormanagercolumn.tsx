import { IColumn, Stack } from "@fluentui/react"
import { tooltipPlainText } from "src/utils/utils";
import { Convert, Validate } from "utils";

export const doctormanagementColumns: IColumn[] = [
  {
    key: 'fullname',
    name: 'Họ và tên',
    minWidth: 150,
    maxWidth: 250,
    isResizable: true,
    onRender: (item) => {
      return <Stack>{item?.fullname}</Stack>;
    },
  },
  {
    key: 'department',
    name: 'Khoa',
    minWidth: 100,
    maxWidth: 300,
    isResizable: true,
    onRender: (item) => {
      return tooltipPlainText(item?.departmentName);
    },
  },
  { 
    key: 'gender',
    name:'Giới tính',
    minWidth: 100,
    isResizable: true,
    onRender: (item) => {
      return <span>{Convert.convertGender(item?.gender)}</span>
    }
  },
  {
    key: 'position',
    name:'Chức vụ',
    minWidth: 100,
    isResizable: true,
    onRender: (item) => {
      return <span>{Convert.getDoctorPosition(item?.position)}</span>
    }
  },
  {
    key: 'phonenumber',
    name: 'Số điện thoại',
    minWidth: 200,
    maxWidth: 300,
    isResizable: true,
    onRender: (item) => {
      return <span>{item?.phonenumber}</span>;
    },
  },
  {
    key: 'address',
    name: 'Địa chỉ',
    minWidth: 200,
    maxWidth: 300,
    isResizable: true,
    onRender: (item) => {
      return <span>{item?.address}</span>;
    },
  },
];
