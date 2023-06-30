import { IColumn, Stack } from "@fluentui/react"
import { useNavigate } from "react-router-dom";
import { LinkButton } from "src/app/common/Link";
import { tooltipPlainText } from "src/utils/utils";
import { Convert, Validate } from "utils";

export const doctormanagementColumns: IColumn[] = [
  {
    key: 'fullname',
    name: 'Họ và tên',
    minWidth: 120,
    maxWidth: 220,
    isResizable: true,
    onRender: (item) => {
      return (
        <LinkButton className="name-viewed" navigate={`/doctor-details`}>{tooltipPlainText(item?.fullname)}</LinkButton>
      )
    },
  },
  {
    key: 'department',
    name: 'Khoa',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    onRender: (item) => {
      return tooltipPlainText(item?.departmentName);
    },
  },
  {
    key: 'position',
    name: 'Chức vụ',
    minWidth: 80,
    maxWidth: 120,
    isResizable: true,
    onRender: (item) => {
      return <span>{Convert.getDoctorPosition(item?.position)}</span>
    }
  },
  {
    key: 'rank',
    name: 'Trình độ',
    minWidth: 80,
    maxWidth: 120,
    isResizable: true,
    onRender: (item) => {
      return <span>{Convert.getDoctorRank(item?.rank)}</span>
    }
  },
  {
    key: 'phonenumber',
    name: 'Số điện thoại',
    minWidth: 100,
    maxWidth: 180,
    isResizable: true,
    onRender: (item) => {
      return tooltipPlainText(item?.phonenumber)
    },
  },
  {
    key: 'email',
    name: 'Email',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    onRender: (item) => {
      return tooltipPlainText(item?.email)
    },
  },
  {
    key: 'address',
    name: 'Địa chỉ',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    onRender: (item) => {
      return tooltipPlainText(item?.address)
    },
  },
];
