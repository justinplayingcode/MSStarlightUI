import { UniformTable } from "src/app/common";
import { TableType } from "src/model/enum";
import Api from "api";
import { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { IColumn, ICommandBarItemProps } from "@fluentui/react";
import { Convert } from "utils";
import { LinkButton } from "src/app/common/Link";
import { tooltipPlainText } from "src/utils/utils";

function DoctorInDepartment() {
  const { tableSelectedCount, tableSelectedItem } = useSelector((state: RootState) => state.currentSelected);
  const { id: departmentId } = useParams();
  const navigate = useNavigate();

  const integrateItems = (reqbody): Promise<AxiosResponse<any, any>> => {
    const body = {
      ...reqbody,
      departmentId: departmentId
    };
    return Api.departmentApi.getAllDoctorInDepartment(body);
  }

  const columnsDoctorInDeaprtment: IColumn[] = [
    {
      key: 'departmentName',
      name: 'Khoa',
      minWidth: 60,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => {
          return <span>{item?.departmentName}</span>;
      },
    },
    {
      key: 'fullname',
      name: 'Họ và tên',
      minWidth: 120,
      maxWidth: 200,
      isResizable: true,
      onRender: (item) => {
        return <LinkButton className="name-viewed" navigate={`/speciality/doctors/details/${item?.userId}`}>{tooltipPlainText(item?.fullname)}</LinkButton>
      },
    },
    {
      key: 'position',
      name:'Chức vụ',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => {
        return <span>{Convert.getDoctorPosition(item?.position)}</span>
      }
    },
    {
      key: 'rank',
      name:'Trình độ',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => {
        return <span>{Convert.getDoctorRank(item?.rank)}</span>
      }
    },
    {
      key: 'phonenumber',
      name:'Số điện thoại',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => {
        return <span>{item?.phonenumber}</span>
      }
    },
    {
      key: 'email',
      name:'Email',
      minWidth: 180,
      maxWidth: 250,
      isResizable: true,
      onRender: (item) => {
        return <span>{item?.email}</span>
      }
    },
  ]

  const commandBar = (): ICommandBarItemProps[] => {
    const commandBar: ICommandBarItemProps[] = [];
    if (tableSelectedCount === 1) {
      commandBar.push({
        key: 'department-doctor',
        text: 'Thông tin bác sĩ',
        iconProps: { iconName: 'WorkforceManagement' },
        onClick: () => { navigate(`/speciality/doctors/details/${tableSelectedItem[0]?.userId}`) },
      })
    }
    return commandBar;
  }

  return (
    <div className='wrapper-table-content speciality-wrapper'>
      <UniformTable
          integrateItems={integrateItems}
          tableType={TableType.doctorInDepartment}
          columns={columnsDoctorInDeaprtment}
          commandBarItems={commandBar()} // nên thêm 1 nút xem details bác sĩ
        />
    </div>
  );
}

export default DoctorInDepartment;