import { IColumn, Stack } from "@fluentui/react";
import { Convert } from "utils";

export const aappointmentColumns: IColumn[] = [
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
  ];
  