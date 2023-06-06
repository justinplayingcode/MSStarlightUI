import { IColumn } from "@fluentui/react"
import { LinkButton } from "src/app/common/Link";

export const departmentManagementColumns: IColumn[] = [
    {
        key: 'departmentName',
        name: 'Khoa Chuyên Môn',
        minWidth: 200,
        maxWidth: 350,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.departmentName}</span>;
        },
    },
    {
        key: 'totalDoctors',
        name: 'Số lượng bác sĩ',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        onRender: (item) => {
            return <LinkButton onClick={() => alert('navigate to /tablebenhnhannamvien')}>{item.totalDoctors}</LinkButton>;
        },
    },
]