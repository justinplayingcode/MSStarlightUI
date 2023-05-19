export const departmentColumn = [
  {
      key: 'name',
      name: 'Name',
      minWidth: 210,
      maxWidth: 350,
      isResizable: true,
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