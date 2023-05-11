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
      key: 'gender',
      name: 'Giới tính',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onRender: (item) => {
          return <span>{item?.gender}</span>;
      },
  },
];
