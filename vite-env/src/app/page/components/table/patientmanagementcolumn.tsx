import { IColumn } from "@fluentui/react";
import { LinkButton } from "../../../common/Link";
import { Convert } from "../../../../utils";
import { tooltipPlainText } from "../../../../utils/utils";

export const patientmanagementColumns: IColumn[] = [
    {
        key: 'fullname',
        name: 'Họ và tên',
        minWidth: 150,
        maxWidth: 250,
        isResizable: true,
        onRender: (item) => {
            return(
                <LinkButton className="name-viewed" navigate={`/patient-management/patient-details/${item?.userId}`}>{tooltipPlainText(item?.fullname)}</LinkButton>
            )
        },
    },
    {
        key: 'gender',
        name: 'Giới tính',
        minWidth: 50,
        maxWidth: 90,
        isResizable: true,
        onRender: (item) => {
            return <span>{Convert.convertGender(item.gender)}</span>;
        },
    },
    {
        key: 'dateOfBirth',
        name: 'Ngày sinh',
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return tooltipPlainText(item.dateOfBirth)
        },
    },
    {
        key: 'identification',
        name: 'Căn cước công dân',
        minWidth: 100,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return tooltipPlainText(item.identification)
        },
    },
    {
        key: 'insurance',
        name: 'Bảo hiểm y tế',
        minWidth: 100,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return tooltipPlainText(item.insurance)
        },
    },
    {
      key: 'address',
      name: 'Địa chỉ',
      minWidth: 100,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => {
        return tooltipPlainText(item.address)
      },
    },
    {
      key: 'phonenumber',
      name: 'Số điện thoại',
      minWidth: 100,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => {
          return tooltipPlainText(item.phonenumber)
      },
    },
    {
      key: 'email',
      name: 'Email',
      minWidth: 100,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => {
          return tooltipPlainText(item.email)
      },
    },     
];