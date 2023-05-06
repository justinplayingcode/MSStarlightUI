import { IColumn, ICommandBarItemProps, TooltipHost } from "@fluentui/react"

export const doctormanagementColumns: IColumn[] = [
  {
    key: 'column1',
    name: 'File Type',
    ariaLabel: 'Column operations for File type, Press to sort on File type',
    iconName: 'Page',
    isIconOnly: true,
    fieldName: 'name',
    minWidth: 16,
    maxWidth: 16,
    // onColumnClick: this._onColumnClick,
    onRender: (item) => (
      <TooltipHost content={`${item.fileType} file`}>
        <img src={item.iconName} alt={`${item.fileType} file icon`} />
      </TooltipHost>
    ),
  },
  {
    key: 'column2',
    name: 'Name',
    fieldName: 'name',
    minWidth: 210,
    maxWidth: 350,
    isRowHeader: true,
    isResizable: true,
    isSorted: true,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    // onColumnClick: this._onColumnClick,
    data: 'string',
    isPadded: true,
  },
  {
    key: 'column3',
    name: 'Date Modified',
    fieldName: 'dateModifiedValue',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    // onColumnClick: this._onColumnClick,
    data: 'number',
    onRender: (item) => {
      return <span>{item.dateModified}</span>;
    },
    isPadded: true,
  },
  {
    key: 'column4',
    name: 'Modified By',
    fieldName: 'modifiedBy',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    isCollapsible: true,
    data: 'string',
    // onColumnClick: this._onColumnClick,
    onRender: (item) => {
      return <span>{item.modifiedBy}</span>;
    },
    isPadded: true,
  },
  {
    key: 'column5',
    name: 'File Size',
    fieldName: 'fileSizeRaw',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    isCollapsible: true,
    data: 'number',
    // onColumnClick: this._onColumnClick,
    onRender: (item) => {
      return <span>{item.fileSize}</span>;
    },
  },
];

export const doctormanagementCommandBar: ICommandBarItemProps[] = [
  {
      key: 'newItem',
      text: 'New',
      iconProps: { iconName: 'Add' },
      onClick: () => console.log('Add'),
  },
]