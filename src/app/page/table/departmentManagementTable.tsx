import { IColumn } from "@fluentui/react"

export const departmentManagementColumns: IColumn[] = [
    {
        key: 'code',
        name: 'Mã khoa',
        minWidth: 70,
        maxWidth: 120,
        isResizable: true,
        onRender: (item) => {
            return <span>{item.code}</span>;
        },
    },
    {
        key: 'name',
        name: 'Name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onRender: (item) => {
            return <span>{item.name}</span>;
        },
    },
]