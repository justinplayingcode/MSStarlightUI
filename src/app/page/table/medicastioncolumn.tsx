import { tooltipPlainText } from "src/utils/utils";

export const medicationColumns =[
  {
      key: 'name',
      name: 'Tên thuốc',
      minWidth: 180,
      maxWidth: 250,
      isResizable: true,
      onRender: (item) => {
          return <div>{item?.name}</div>;
      },
  },
  {
      key: 'usage',
      name: 'Công dụng',
      minWidth: 280,
      maxWidth: 400,
      isResizable: true,
      onRender: (item) => {
          return(
              tooltipPlainText(item?.usage)
          )
      },
  },
  {
      key: 'price',
      name: 'Giá',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onRender: (item) => {
          return <span>{item?.price} đ</span>;
      },
  },

];