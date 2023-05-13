import { IColumn, Stack } from "@fluentui/react"

export const doctormanagementColumns: IColumn[] = [
  {
    key: 'fullname',
    name: 'Họ và tên',
    minWidth: 210,
    maxWidth: 350,
    isResizable: true,
    isSorted: true,
    isSortedDescending: false,
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
