import { tooltipPlainText } from "src/utils/utils";

export const diseasesColumns =[
  {
      key: 'code',
      name: 'Mã bệnh',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onRender: (item) => {
          return <div>{item?.code}</div>;
      },
  },
  {
      key: 'name',
      name: 'Tên bệnh',
      minWidth: 180,
      maxWidth: 250,
      isResizable: true,
      onRender: (item) => {
          return <span>{item?.name}</span>;
      },
  },
  {
      key: 'description',
      name: 'Mô tả',
      minWidth: 230,
      maxWidth: 350,
      isResizable: true,
      onRender: (item) => {
          return (tooltipPlainText(item?.description));
      },
  },
  {
      key: 'department',
      name: 'Khoa',
      minWidth: 230,
      maxWidth: 350,
      isResizable: true,
      onRender: (item) => {
          return <span>{item?.departmentId}</span>;
      },
  },
];