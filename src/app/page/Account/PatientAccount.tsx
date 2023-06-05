import { ICommandBarItemProps } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UniformTable } from "src/app/common";
import { panelTypeConstant } from "src/model/contant";
import { openPanel } from "src/redux/reducers";
import { patientmanagementColumns } from "../table/patientmanagementcolumn";
import Api from 'src/api'
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { accountRole } from "model";
import { TableType } from "src/model/enum";

function PatientAccount() {
  const dispatch = useDispatch();
  const {role, info} = useSelector((state: RootState) => state.user);
  const {tableSelectedCount} = useSelector((state: RootState) => state.currentSelected);


  const getPatientmanagementCommandBar = () => {

    //remove add button
    const commandBar = [];
    if(role === accountRole.Doctor && info?.department === 'Khoa Tiếp Đón'){
      commandBar.push(
        {
          key: 'newItem',
          text: 'Thêm',
          iconProps: { iconName: 'Add' },
          onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_PATIENT)) },
        },
      )
    };
    if(tableSelectedCount === 1){
      commandBar.push({
          key: 'edit',
          text: 'Sửa',
          iconProps: { iconName: 'PageHeaderEdit' },
          onClick: () => { alert('edit') },
      })
  };
    return commandBar;
  
  } 

  return (
    <div className='wrapper-table-content speciality-wrapper'>
      <UniformTable
        searchByKeyWord='name'
        integrateItems={Api.accountApi.getAll}      
        columns={patientmanagementColumns}
        commandBarItems={getPatientmanagementCommandBar()}
        tableType={TableType.patientAccount} 
        />
    </div>
  );
}

export default PatientAccount;