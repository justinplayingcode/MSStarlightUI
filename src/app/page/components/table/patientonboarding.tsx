import { IColumn } from "@fluentui/react"
import { tooltipPlainText } from "src/utils/utils";
import { Convert } from "utils";

export const patientonboardingtColumns: IColumn[] = [
    {
      key: 'departmentName',
      name: 'Khoa',
      minWidth: 80,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.departmentName}</span>;
      },
    },
    {
        key: 'fullname',
        name: 'Họ và tên',
        minWidth: 150,
        maxWidth: 250,
        isResizable: true,
        onRender: (item) => {
            return tooltipPlainText(item.fullname)
        },
    },
    {
        key: 'gender',
        name: 'Giới tính',
        minWidth: 50,
        maxWidth: 90,
        isResizable: true,
        onRender: (item) => {
            return <span>{Convert.convertGender(item.gender)}</span>;
        },
    },
    {
        key: 'dateOfBirth',
        name: 'Ngày sinh',
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return tooltipPlainText(item.dateOfBirth)
        },
    },
    {
        key: 'identification',
        name: 'Căn cước công dân',
        minWidth: 100,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return tooltipPlainText(item.identification)
        },
    },
    {
        key: 'insurance',
        name: 'Bảo hiểm y tế',
        minWidth: 100,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return tooltipPlainText(item.insurance)
        },
    },
    {
      key: 'address',
      name: 'Địa chỉ',
      minWidth: 100,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => {
        return tooltipPlainText(item.address)
      },
    },
    {
      key: 'phonenumber',
      name: 'Số điện thoại',
      minWidth: 100,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => {
          return tooltipPlainText(item.phonenumber)
      },
    },
    {
      key: 'email',
      name: 'Email',
      minWidth: 100,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => {
          return tooltipPlainText(item.email)
      },
    }   
];