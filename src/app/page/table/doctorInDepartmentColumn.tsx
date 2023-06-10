import { IColumn, Stack } from "@fluentui/react";
import { Convert } from "utils";

export const doctorInDepartmentColumns: IColumn[] = [
    {
      key: 'fullname',
      name: 'Họ và tên',
      minWidth: 180,
      maxWidth: 250,
      isResizable: true,
      onRender: (item) => {
        return <Stack>{item?.fullname}</Stack>;
      },
    },
    {
      key: 'position',
      name:'Chức vụ',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => {
        return <span>{Convert.getDoctorPosition(item?.position)}</span>
      }
    },
    {
      key: 'rank',
      name:'Trình độ',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => {
        return <span>{Convert.getDoctorRank(item?.rank)}</span>
      }
    },
    {
      key: 'phonenumber',
      name:'Số điện thoại',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => {
        return <span>{item?.phonenumber}</span>
      }
    },
    {
      key: 'email',
      name:'Email',
      minWidth: 180,
      maxWidth: 250,
      isResizable: true,
      onRender: (item) => {
        return <span>{item?.email}</span>
      }
    },
  ];
  