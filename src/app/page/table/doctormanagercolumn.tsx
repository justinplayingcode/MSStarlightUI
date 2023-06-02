import { IColumn, Stack } from "@fluentui/react"
import { Convert, Validate } from "utils";

export const doctormanagementColumns: IColumn[] = [
  {
    key: 'fullname',
    name: 'Họ và tên',
    minWidth: 150,
    maxWidth: 350,
    isResizable: true,
    onRender: (item) => {
      return <Stack>{item?.fullname}</Stack>;
    },
  },
  {
    key: 'department',
    name: 'Khoa',
    minWidth: 150,
    maxWidth: 200,
    isResizable: true,
    onRender: (item) => {
      return <span>{item?.department}</span>;
    },
  },
  {
    key: 'position',
    name:'Chức vụ',
    minWidth: 50,
    isResizable: true,
    onRender: (item) => {
      return <span>{Convert.convertGender(item?.gender)}</span>
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
