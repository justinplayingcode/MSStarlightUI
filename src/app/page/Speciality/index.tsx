import { ICommandBarItemProps } from '@fluentui/react';
import './index.scss';
import { UniformTable } from 'src/app/common';
import Api from 'src/api/index'
import { TableType } from 'src/model/enum';
import { departmentManagementColumns } from '../components/table/departmentManagementTable';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useNavigate } from 'react-router-dom';

const Speciality = () => {
  const { tableSelectedCount, tableSelectedItem } = useSelector((state: RootState) => state.currentSelected);
  const navigate = useNavigate();

  const commandBar = (): ICommandBarItemProps[] => {
    const commandBar: ICommandBarItemProps[] = [];
    if (tableSelectedCount === 1) {
      commandBar.push({
        key: 'department-doctor',
        text: 'Danh sách bác sĩ',
        iconProps: { iconName: 'WorkforceManagement' },
        onClick: () => { navigate(`/speciality/doctors/${tableSelectedItem[0]?._id}`) },
      })
    }
    return commandBar;
  }

  return(
    <div className='wrapper-table-content speciality-wrapper'>
        <UniformTable
            commandBarItems={commandBar()}
            columns={departmentManagementColumns} 
            integrateItems={Api.departmentApi.getAllDepartmentForTable}
            tableType={TableType.departments}
        />
    </div>
  )
}
export default Speciality;