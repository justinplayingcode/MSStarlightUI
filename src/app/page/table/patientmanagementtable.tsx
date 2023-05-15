import { IColumn, ICommandBarItemProps, TooltipHost } from "@fluentui/react"
import { Convert } from "utils";

export const patientmanagementColumns: IColumn[] = [
    {
        key: 'fullname',
        name: 'Họ và tên',
        minWidth: 210,
        maxWidth: 350,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
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
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.address}</span>;
        },
    },
    {
        key: 'insurance',
        name: 'Bảo hiểm y tế',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.insurance}</span>;
        },
    },
];