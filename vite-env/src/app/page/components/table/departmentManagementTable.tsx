import { IColumn } from "@fluentui/react"
import { LinkButton } from "../../../common/Link";

export const departmentManagementColumns: IColumn[] = [
    {
        key: 'departmentName',
        name: 'Tên khoa',
        minWidth: 120,
        maxWidth: 220,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.departmentName}</span>;
        },
    },
    {
        key: 'totalDoctors',
        name: 'Số lượng bác sĩ',
        minWidth: 100,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item) => {
            return <LinkButton navigate={`/speciality/doctors/${item?._id}`}>{item.totalDoctors}</LinkButton>;
        },
    },
]