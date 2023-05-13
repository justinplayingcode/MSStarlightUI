import { IColumn, ICommandBarItemProps, TooltipHost } from "@fluentui/react"

export const patientmanagementColumns: IColumn[] = [
  {
      key: 'name',
      name: 'Name',
      minWidth: 210,
      maxWidth: 350,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      onRender: (item) => {
          return <span>{item.name}</span>;
      },
  },
  {
      key: 'code',
      name: 'Code',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onRender: (item) => {
          return <span>{item.code}</span>;
      },
  },
];