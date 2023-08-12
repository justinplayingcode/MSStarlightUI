import { IColumn } from "@fluentui/react"
import { LinkButton } from "src/app/common/Link";

export const departmentManagementColumns: IColumn[] = [
    {
      key: 'departmentCode',
      name: 'Mã khoa',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.departmentCode}</span>;
      },
    },
    {
      key: 'id',
      name: 'Mã định danh',
      minWidth: 150,
      maxWidth: 250,
      isResizable: true,
      onRender: (item) => {
          return <span>{item._id}</span>;
      },
    },
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