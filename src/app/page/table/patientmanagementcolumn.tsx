import { IColumn, ICommandBarItemProps, TooltipHost } from "@fluentui/react"
import { Convert } from "utils";

export const patientmanagementColumns: IColumn[] = [
    {
        key: 'fullname',
        name: 'Họ và tên',
        minWidth: 150,
        maxWidth: 250,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.fullname}</span>;
        },
    },
    {
        key: 'gender',
        name: 'Giới tính',
        minWidth: 50,
        // maxWidth: 90,
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
            return <span>{item.dateOfBirth}</span>;
        },
    },
    {
        key: 'identification',
        name: 'Căn cước công dân',
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.identification}</span>;
        },
    },
    {
        key: 'insurance',
        name: 'Bảo hiểm y tế',
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.insurance}</span>;
        },
    },    
    {
        key: 'address',
        name: 'Địa chỉ',
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.address}</span>;
        },
    },
];